import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import React from "react";
import { BadgeType } from "../_hooks/useCourse";

export interface CourseBadgeProps {
  item: BadgeType;
  onDelete: () => void;
}

const CourseBadge = ({ item, onDelete }: CourseBadgeProps) => {
  const { label } = item || {};
  return (
    <>
      <Badge
        variant="outline"
        className="py-[10.5px] px-[16px] min-w-[72px] max-h-[37px]"
      >
        <div className="flex items-center w-full justify-between">
          {label && <p>{label}</p>}

          <div className="cursor-pointer" onClick={onDelete}>
            <Image
              src={`/png/ic_x_16.png`}
              width={16}
              height={16}
              alt="ic_x_16_png"
            />
          </div>
        </div>
      </Badge>
    </>
  );
};

export default CourseBadge;
