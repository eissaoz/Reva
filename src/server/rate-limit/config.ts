export const rateLimitPolicies = {
  authMutation: {
    maxRequests: 10,
    windowMs: 10 * 60 * 1000,
  },
  onboardingWrite: {
    maxRequests: 30,
    windowMs: 10 * 60 * 1000,
  },
  privateRead: {
    maxRequests: 120,
    windowMs: 60 * 1000,
  },
} as const;

export type RateLimitPolicy = (typeof rateLimitPolicies)[keyof typeof rateLimitPolicies];
