import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface Props {
  title: string | ReactNode;
  titleClassName?: string;
  subtitle?: string | ReactNode;
  subtitleClassName?: string;
}

export default function Title({
  title,
  subtitle,
  titleClassName = "",
  subtitleClassName = "",
}: Props) {
  return (
    <div className="flex flex-col gap-y-[12px]">
      <h1 className={cn("text-bold-22", titleClassName)}>{title}</h1>
      {subtitle && (
        <p className={cn("text-regular-15", subtitleClassName)}>{subtitle}</p>
      )}
    </div>
  );
}
