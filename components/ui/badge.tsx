import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border justify-center text-[14px] px-[12px] py-[8px] font-normal transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-neutral-100 font-medium text-black hover:bg-[#B5B9C6] hover:text-white focus:bg-[#747B89] focus:text-semibold focus:text-white",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        selected:
          "border-transparent bg-secondary-700 text-white font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
