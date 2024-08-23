import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface InputWithLabelProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  iconSrc?: string;
  required?: boolean;
}

const InputWithLabel = React.forwardRef<HTMLInputElement, InputWithLabelProps>(
  ({ className, iconSrc, value, required, type, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-y-2 w-full bg-[#F9FAFB] border rounded-[12px]">
        <div className="flex items-center w-full h-[56px] px-[20px]">
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
            ref={ref}
            {...props}
          />
        </div>
      </div>
    );
  }
);
InputWithLabel.displayName = "InputWithLabel";

export { InputWithLabel };
