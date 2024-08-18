import * as React from "react";

import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const inputClassName = cva(
  `
            flex
            h-[56px]
            w-full
            rounded-[12px]
            border-color-neutral-200
            border
            border-input
            bg-transparent
            bg-neutral-100
            px-[20px]
            py-[16px]
            text-fontSize-medium-16
            text-color-neutral-500
            shadow-sm
            transition-colors
            file:border-0
            file:bg-transparent
            file:text-sm
            file:font-medium
            placeholder:text-muted-foreground
            focus-visible:outline-none
            focus-visible:ring-0
            focus-visible:ring-ring
            focus:bg-neutral-200
            disabled:cursor-not-allowed
            disabled:opacity-50
            caret-Primary-700
            `
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftSlot, rightSlot, disabled, ...props }, ref) => {
    const paddingLeft = leftSlot ? "pl-[40px]" : "";
    const paddingRight = rightSlot ? "pr-[64px]" : "";
    const placeholderColorClass = disabled
      ? "placeholder:text-[#EC3737]"
      : "placeholder:text-muted-foreground";
    const fontWeightClass = disabled ? "font-semibold" : "font-medium";
    return (
      <div className="relative flex items-center w-full">
        {leftSlot && (
          <div className="absolute left-4 flex items-center">{leftSlot}</div>
        )}
        <input
          type={type}
          className={cn(
            inputClassName(),
            paddingLeft,
            paddingRight,
            placeholderColorClass,
            fontWeightClass,
            className
          )}
          disabled={disabled}
          ref={ref}
          {...props}
        />
        {rightSlot && (
          <div className="absolute right-4 flex items-center">{rightSlot}</div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
