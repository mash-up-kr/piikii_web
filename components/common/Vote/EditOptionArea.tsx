"use client";
import { CategoryChip } from "@/app/add-course/_components/CategoryChip";
import { CardWithSelectedOption } from "@/components/common/Cards/CardWithSelectedOption";
import { EditOptionAreaProps } from "@/model";

const EditOptionArea = ({
  schedules,
  selectedSchedule,
  selectedPlaces,
  onClickSchedule,
  onClickPlaceCard,
}: EditOptionAreaProps) => {
  return (
    <div className="flex flex-col max-w-[430px] w-full h-[631px] px-[20px] gap-y-[26px]">
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
      <div className="flex flex-col gap-y-[14px]">
        {selectedSchedule.places.map((placeInfo, index) => (
          <CardWithSelectedOption
            key={index}
            selected={
              selectedPlaces[selectedSchedule.scheduleId] === placeInfo.placeId
            }
            origin={placeInfo.origin}
            place={placeInfo.name}
            link={placeInfo.url}
            rating={+(placeInfo?.starGrade ?? 0).toFixed(2)}
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
