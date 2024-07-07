import { ValueType } from "@/app/edit-course/_components/DragAndDropArea";
import { Card } from "@/components/ui/card";
import Image from "next/image";

type CardWithCourseProps = {
  item: ValueType;
};

const CardWithCourse = ({ item }: CardWithCourseProps) => {
  return (
    <Card className="flex flex-row items-center justify-between w-[303px] h-[56px] py-[16px] px-[24px] rounded-[12px]">
      <div className="flex gap-x-[6px]">
        <label className="w-[16px] h-[24px]">{item.icon}</label>
        <label>{item.title}</label>
        {/* index 확인을 위한 임시 label을 추가 */}
        <label className="flex justify-center items-center font-bold text-[10px]">
          index: {item.globalIndex}
        </label>
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
