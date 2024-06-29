import { cn } from "@/lib/utils";

interface Props {
  curStep: number;
  totalSteps: number;
  className?: string;
}

export default function Step({ curStep, totalSteps, className }: Props) {
  return (
    <div className={cn("flex w-full gap-x-[4px] items-center", className)}>
      {Array(totalSteps)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className={cn(
              "flex-1 rounded-[2px] opacity-[0.1] bg-primary-200 h-[3px]",
              curStep === index && "bg-secondary-dislike-700 opacity-1"
            )}
          />
        ))}
    </div>
  );
}
