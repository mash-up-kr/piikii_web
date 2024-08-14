import { ScheduleResponse } from "@/apis/schedule/types/model";
import { Card } from "@/components/ui/card";
import { iconInfo } from "@/lib/utils";
import Image from "next/image";

type CardWithCourseProps = {
  item: ScheduleResponse;
};

const CardWithCourse = ({ item }: CardWithCourseProps) => {
  const findIcon = (type: string) => {
    const icon = iconInfo.find((icon) => icon.type === type);
    return icon ? icon.icon : null;
  };

  return (
    <Card className="flex flex-row items-center justify-between w-[303px] h-[56px] py-[16px] px-[24px] rounded-[12px]">
      <div className="flex gap-x-[6px]">
        <label>{findIcon(item.type)}</label>
        <label className="w-[120px] h-[24px]">{item.name}</label>
      </div>
      <Image
        src="/svg/ic_arrow_up_down.svg"
        alt="arrow"
        width={16}
        height={16}
        style={{ width: 16, height: 16 }}
        priority
        unoptimized
      />
    </Card>
  );
};

export default CardWithCourse;
