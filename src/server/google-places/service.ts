const GOOGLE_FIND_PLACE_URL = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json";
const GOOGLE_PLACE_DETAILS_URL = "https://maps.googleapis.com/maps/api/place/details/json";

const PLACE_ID_REGEX = /(?:place_id=|placeid=|!1s)([A-Za-z0-9_-]{10,})/i;

type PlaceDetails = {
  place_id: string;
  name?: string;
  formatted_address?: string;
  rating?: number;
  user_ratings_total?: number;
  url?: string;
};

type GoogleApiResponse = {
  status: string;
  error_message?: string;
  candidates?: PlaceDetails[];
  result?: PlaceDetails;
};

export type ResolvedGooglePlace = {
  placeId: string;
  placeName: string | null;
  formattedAddress: string | null;
  rating: number | null;
  reviewCount: number | null;
  businessLink: string;
  reviewLink: string;
};

export class GooglePlaceValidationError extends Error {
  readonly status = 400;

  constructor(message: string) {
    super(message);
    this.name = "GooglePlaceValidationError";
  }
}

export class GooglePlaceQuotaError extends Error {
  readonly status = 429;

  constructor(message: string) {
    super(message);
    this.name = "GooglePlaceQuotaError";
  }
}

export class GooglePlaceProviderError extends Error {
  readonly status = 503;

  constructor(message: string) {
    super(message);
    this.name = "GooglePlaceProviderError";
  }
}

function getApiKey() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    throw new GooglePlaceProviderError("Google Places API key is not configured");
  }

  return apiKey;
}

function normalizeLink(rawLink: string) {
  try {
    return new URL(rawLink).toString();
  } catch {
    throw new GooglePlaceValidationError("A valid Google business link is required.");
  }
}

function extractPlaceIdFromLink(link: string) {
  const match = link.match(PLACE_ID_REGEX);
  return match?.[1] ?? null;
}

function buildReviewLink(placeId: string) {
  return `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`;
}

function pickTextQuery(link: string) {
  const url = new URL(link);
  const query = url.searchParams.get("q") || url.searchParams.get("query") || url.searchParams.get("destination");

  if (query?.trim()) {
    return query.trim();
  }

  const placePathMatch = url.pathname.match(/\/maps\/place\/([^/]+)/i);
  if (placePathMatch?.[1]) {
    return decodeURIComponent(placePathMatch[1]).replace(/\+/g, " ").trim();
  }

  if (url.hostname.toLowerCase() === "g.page") {
    const slug = url.pathname.replace(/^\//, "").split("/")[0];
    if (slug) {
      return slug.replace(/[-_]+/g, " ");
    }
  }

  return null;
}

function normalizeGoogleApiError(status: string): never {
  if (status === "ZERO_RESULTS") {
    throw new GooglePlaceValidationError("Unable to resolve a Google place from that link.");
  }

  if (status === "OVER_QUERY_LIMIT") {
    throw new GooglePlaceQuotaError("Google Places quota exceeded. Try again shortly.");
  }

  if (status === "INVALID_REQUEST") {
    throw new GooglePlaceValidationError("Google place request was invalid.");
  }

  if (status === "REQUEST_DENIED") {
    throw new GooglePlaceProviderError("Google Places request was denied. Check API key and billing configuration.");
  }

  throw new GooglePlaceProviderError("Google Places is temporarily unavailable.");
}

async function fetchJson(url: URL) {
  let response: Response;

  try {
    response = await fetch(url, { method: "GET", cache: "no-store" });
  } catch {
    throw new GooglePlaceProviderError("Could not connect to Google Places.");
  }

  if (!response.ok) {
    if (response.status === 429) {
      throw new GooglePlaceQuotaError("Google Places rate limit reached. Try again shortly.");
    }

    throw new GooglePlaceProviderError("Google Places request failed.");
  }

  return (await response.json()) as GoogleApiResponse;
}

async function resolveByPlaceId(placeId: string, apiKey: string) {
  const url = new URL(GOOGLE_PLACE_DETAILS_URL);
  url.searchParams.set("place_id", placeId);
  url.searchParams.set("fields", "place_id,name,formatted_address,rating,user_ratings_total,url");
  url.searchParams.set("key", apiKey);

  const payload = await fetchJson(url);

  if (payload.status !== "OK" || !payload.result?.place_id) {
    normalizeGoogleApiError(payload.status);
  }

  return payload.result;
}

async function resolveByTextQuery(textQuery: string, apiKey: string) {
  const url = new URL(GOOGLE_FIND_PLACE_URL);
  url.searchParams.set("input", textQuery);
  url.searchParams.set("inputtype", "textquery");
  url.searchParams.set("fields", "place_id,name,formatted_address,rating,user_ratings_total,url");
  url.searchParams.set("key", apiKey);

  const payload = await fetchJson(url);

  if (payload.status !== "OK" || !payload.candidates?.[0]?.place_id) {
    normalizeGoogleApiError(payload.status);
  }

  return payload.candidates[0];
}

function normalizeNullableNumber(value: number | undefined) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return null;
  }

  return value;
}

function sanitizeRating(value: number | undefined) {
  const rating = normalizeNullableNumber(value);
  if (rating === null) {
    return null;
  }

  return Math.max(0, Math.min(5, Number(rating.toFixed(1))));
}

function sanitizeReviewCount(value: number | undefined) {
  const count = normalizeNullableNumber(value);
  if (count === null) {
    return null;
  }

  return Math.max(0, Math.trunc(count));
}

function pickReviewLink(inputLink: string, place: PlaceDetails) {
  if (/\/review\b/i.test(inputLink)) {
    return inputLink;
  }

  if (place.url && /\/review\b/i.test(place.url)) {
    return place.url;
  }

  return buildReviewLink(place.place_id);
}

export async function resolveGooglePlaceFromLink(rawLink: string): Promise<ResolvedGooglePlace> {
  const apiKey = getApiKey();
  const businessLink = normalizeLink(rawLink);
  const explicitPlaceId = extractPlaceIdFromLink(businessLink);
  const textQuery = pickTextQuery(businessLink);

  if (!explicitPlaceId && !textQuery) {
    throw new GooglePlaceValidationError("Unable to resolve place from this Google link.");
  }

  const place = explicitPlaceId
    ? await resolveByPlaceId(explicitPlaceId, apiKey)
    : await resolveByTextQuery(textQuery!, apiKey);

  return {
    placeId: place.place_id,
    placeName: place.name ?? null,
    formattedAddress: place.formatted_address ?? null,
    rating: sanitizeRating(place.rating),
    reviewCount: sanitizeReviewCount(place.user_ratings_total),
    businessLink,
    reviewLink: pickReviewLink(businessLink, place),
  };
}
