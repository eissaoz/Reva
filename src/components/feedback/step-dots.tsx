type StepDotsProps = {
  step: number;
  total?: number;
};

export function StepDots({ step, total = 3 }: StepDotsProps) {
  return (
    <div className="feedback-progress" aria-label={`Step ${step} of ${total}`}>
      {Array.from({ length: total }).map((_, index) => {
        const current = index + 1 === step;
        return <span key={index} className={`feedback-dot ${current ? "feedback-dot-on" : ""}`} />;
      })}
    </div>
  );
}
