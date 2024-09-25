import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface InputWithLabelProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  iconSrc?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const InputWithLabel = React.forwardRef<HTMLInputElement, InputWithLabelProps>(
  ({ className, iconSrc, value, onChange, required, type, ...props }, ref) => {
    const maxLength = 50;
    const inputLength = typeof value === "string" ? value.length : 0;

    return (
      <div className="flex flex-col gap-y-2 w-full bg-[#F9FAFB] focus-within:bg-[#F0F1F5] border rounded-[12px]">
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
              "flex-1 bg-[#F9FAFB] focus:bg-[#F0F1F5] text-[#8B95A1] focus:text-[#1B1F27] text-[16px] outline-none",
              className
            )}
            value={value}
            maxLength={maxLength}
            onChange={onChange}
            ref={ref}
            {...props}
          />
          {inputLength > 0 && (
            <div className="w-[36px] ml-[16px] flex flex-row justify-end">
              <p className="text-[#FF601C]">{inputLength}</p>
              <p className="text-[#8B95A1]">/{maxLength}</p>
            </div>
          )}
        </div>
      </div>
    );
  }
);
InputWithLabel.displayName = "InputWithLabel";

export { InputWithLabel };
