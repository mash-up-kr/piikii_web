import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

interface Props {
  curStep: number;
  totalSteps: number;
  containerClassName?: string;
  stepActiveClassName?: ClassValue;
  stepInactiveClassName?: ClassValue;
}

export default function Step({
  curStep,
  totalSteps,
  containerClassName,
  stepActiveClassName,
  stepInactiveClassName,
}: Props) {
  return (
    <div
      className={cn("flex w-full gap-x-[4px] items-center", containerClassName)}
    >
      {Array(totalSteps)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className={cn(
              "flex-1 rounded-[2px] h-[3px]",
              curStep === index ? stepActiveClassName : stepInactiveClassName
            )}
          />
        ))}
    </div>
  );
}
