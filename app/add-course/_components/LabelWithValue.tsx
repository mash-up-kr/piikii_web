import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface LabelWithValueProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  iconSrc?: string;
  required?: boolean;
}

const LabelWithValue = React.forwardRef<HTMLInputElement, LabelWithValueProps>(
  ({ className, iconSrc, value, required, type = "text", ...props }, ref) => {
    return (
      <div className="flex items-center w-full h-[24px]">
        {iconSrc && (
          <Image
            className="mr-[12px]"
            src={iconSrc}
            alt="icon"
            width={18}
            height={18}
          />
        )}
        <input
          type={type}
          className={cn(
            "flex-1 bg-transparent text-[#8B95A1] text-[16px] outline-none",
            className
          )}
          value={value}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
LabelWithValue.displayName = "LabelWithValue";
export { LabelWithValue };
