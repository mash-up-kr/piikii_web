import { Card, CardContent } from "@/components/ui/card";
import { CardIconProps } from "@/model";

export const CardWithIconList: React.FC<CardIconProps> = ({ iconInfo }) => {
  return (
    <div className="w-[335px] h-[240px] grid grid-cols-2 grid-rows-2 gap-[8px]">
      {iconInfo.slice(0, 4).map((item, index) => (
        <Card
          key={index}
          className={`flex flex-col w-[164px] h-[116px] items-center justify-center cursor-pointer pt-[19px] pb-[18px] bg-[#FFF7F2] hover:bg-[#FFF1EB] active:bg-[#FFEAE1]`}
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
};

export default CardWithIconList;
