"use client";
import { CategoryChip } from "@/app/add-course/_components/CategoryChip";
import { CardWithSelectedOption } from "@/components/common/Cards/CardWithSelectedOption";
import { flattenColumns } from "@/lib/utils";
import { EditOptionAreaProps, VoteAreaProps } from "@/model";
import { useState } from "react";

const EditOptionArea = ({
  schedules,
  selectedSchedule,
  selectedPlaces,
  onClickSchedule,
  onClickPlaceCard,
}: EditOptionAreaProps) => {
  return (
    <div className="flex flex-col w-[335px] h-[631px] mx-[20px] gap-y-[26px]">
      <div className="flex flex-row w-[252px] h-[37px] gap-x-[8px]">
        {schedules.map((item) => (
          <CategoryChip
            key={item.scheduleId}
            title={item.scheduleName}
            selected={selectedSchedule.scheduleId === item.scheduleId}
            onClick={() => onClickSchedule(item.scheduleId)}
          />
        ))}
      </div>
      <div className="flex flex-col gap-y-[12px]">
        {selectedSchedule.places.map((placeInfo, index) => (
          <CardWithSelectedOption
            key={index}
            selected={
              selectedPlaces[selectedSchedule.scheduleId] === placeInfo.placeId
            }
            origin={placeInfo.origin}
            place={placeInfo.name}
            link={placeInfo.url}
            rating={placeInfo.starGrade.toString() ?? "0"}
            images={placeInfo.thumbnailLinks.contents || []}
            voteCount={placeInfo.countOfAgree}
            onButtonClick={() =>
              onClickPlaceCard(selectedSchedule.scheduleId, placeInfo.placeId)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default EditOptionArea;
