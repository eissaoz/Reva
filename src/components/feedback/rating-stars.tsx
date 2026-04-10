type RatingStarsProps = {
  value: number;
  onChange: (value: number) => void;
};

const labels = ["", "Terrible", "Poor", "Okay", "Good", "Excellent"];

export function RatingStars({ value, onChange }: RatingStarsProps) {
  return (
    <div>
      <div className="feedback-stars" role="radiogroup" aria-label="Rate your experience">
        {Array.from({ length: 5 }).map((_, index) => {
          const star = index + 1;
          const active = star <= value;
          const dim = value > 0 && star > value;

          return (
            <button
              key={star}
              type="button"
              role="radio"
              aria-checked={value === star}
              aria-label={`${star} star${star > 1 ? "s" : ""}`}
              className={`feedback-star ${active ? "feedback-star-active" : ""} ${dim ? "feedback-star-dim" : ""}`}
              onClick={() => onChange(star)}
            >
              <svg viewBox="0 0 24 24" aria-hidden>
                <path d="M12 2l3 6.3L22 9.3l-5 4.9 1.2 7L12 18l-6.2 3.2 1.2-7L2 9.3l7-1z" />
              </svg>
            </button>
          );
        })}
      </div>
      <p className="feedback-rating-label">{labels[value]}</p>
    </div>
  );
}
