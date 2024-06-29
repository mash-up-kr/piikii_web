import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CardIconProps } from "@/model";

const CardWithIcon: React.FC<CardIconProps> = ({ iconInfo }) => {
  return (
    <Card
      className={`flex flex-col w-[164px] h-[116px] items-center justify-center cursor-pointer pt-[19px] pb-[18px] bg-[#FFF7F2] hover:bg-[#FFF1EB] active:bg-[#FFEAE1]`}
    >
      <CardContent className="flex flex-col">
        <div className="flex flex-col">
          <div className="flex flex-col gap-y-[7px] items-center">
            <div className="flex w-[32px] h-[48px] items-center justify-center font-[34px]">
              {/* NOTE: 임시 데이터  */}
              {iconInfo[3].icon}
            </div>
            <span className="flex w-full max-w-[42px] h-[24px] text-[16px] justify-center">
              {iconInfo[3].label}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardWithIcon;
