import * as React from "react";

import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const inputClassName = cva(
  `
            flex
            h-[56px]
            w-full
            max-w-[335px]
            rounded-[12px]
            border
            border-input
            bg-transparent
            px-[20px]
            py-[16px]
            text-sm
            shadow-sm
            transition-colors
            file:border-0
            file:bg-transparent
            file:text-sm
            file:font-medium
            placeholder:text-muted-foreground
            focus-visible:outline-none
            focus-visible:ring-1
            focus-visible:ring-ring
            disabled:cursor-not-allowed
            disabled:opacity-50
            `
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputClassName(), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
