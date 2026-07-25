import { ResultCard } from "./ResultCard";

interface DisclaimerProps {
  text: string;
}

export function Disclaimer({ text }: DisclaimerProps) {
  return (
    <ResultCard>
      <p className="calc-ui__disclaimer">{text}</p>
    </ResultCard>
  );
}
