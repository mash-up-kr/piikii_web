import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import React from "react";

const basisSectionVariarnts = cva("");

export interface BasisSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  children: React.ReactNode;
}

const BasisSection = React.forwardRef<HTMLDivElement, BasisSectionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(basisSectionVariarnts({ className }))}
        {...props}
      >
        {children}
      </div>
    );
  }
);

BasisSection.displayName = "BasisSection";

export default BasisSection;
