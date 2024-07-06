import * as React from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const textAreaClassName = cva(
  `
      flex
      min-h-[80px]
      w-full
      rounded-md
      border
      border-input
      bg-background
      px-3
      py-2
      text-sm
      ring-offset-background
      placeholder:text-muted-foreground
      focus-visible:outline-none
      focus:outline-none
      disabled:cursor-not-allowed
      disabled:opacity-50
      bg-neutral-100
      border-color-neutral-200
      disabled:cursor-not-allowed
      disabled:opacity-50
      caret-Primary-700
      text-color-neutral-500
      relative
`
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxLength?: number;
  isLengthVisible?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, maxLength = 70, isLengthVisible = true, ...props }, ref) => {
    const [textLength, setTextLength] = React.useState(0);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setTextLength(e.target.value.length);
      if (props.onChange) {
        props.onChange(e);
      }
    };

    return (
      <div className="relative w-full">
        <textarea
          className={cn(textAreaClassName(), className)}
          ref={ref}
          maxLength={maxLength}
          {...props}
          onChange={handleChange}
        />
        {isLengthVisible && (
          <div className="absolute bottom-2 right-2 text-sm text-gray-500">
            <span className="text-primary-700 text-semi-bold-18">
              {textLength}
            </span>
            /
            <span className="text-regular-16 text-neutral-600">
              {maxLength}
            </span>
          </div>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
