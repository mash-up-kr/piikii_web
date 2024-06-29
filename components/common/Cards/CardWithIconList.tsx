import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { IconInfo } from "@/model";
import { cva } from "class-variance-authority";
import React from "react";

const cardWithIconListVariants = cva(
  `
    w-[335px]
    h-full
    grid
    grid-cols-2
    grid-rows-2
    gap-[8px]
  `
);

export interface CardWithIconListProps
  extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  iconInfo: IconInfo[];
  onClickCard?: (value: IconInfo) => void;
}

export const CardWithIconList = React.forwardRef<
  HTMLDivElement,
  CardWithIconListProps
>(({ className, iconInfo, onClickCard }, ref) => {
  const onClick = (item: IconInfo) => {
    onClickCard && onClickCard(item);
  };

  return (
    <div ref={ref} className={cn(cardWithIconListVariants({ className }))}>
      {iconInfo.slice(0, 4).map((item, index) => (
        <Card
          key={index}
          className={`flex flex-col w-[164px] h-[116px] items-center justify-center cursor-pointer pt-[19px] pb-[18px] bg-[#FFF7F2] hover:bg-[#FFF1EB] active:bg-[#FFEAE1]`}
          onClick={() => onClick(item)}
        >
          <CardContent className="flex flex-col">
            <div className="flex flex-col">
              <div className="flex flex-col gap-y-[7px] items-center">
                <div className="flex w-[32px] h-[48px] items-center justify-center text-[34px]">
                  {item.icon}
                </div>
                <span className="flex w-full max-w-[42px] h-[24px] text-[16px] justify-center">
                  {item.label}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
});

CardWithIconList.displayName = "CardWithIconList";

export default CardWithIconList;
