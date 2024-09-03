"use client";
import {
  PlaceResponseDto,
  ScheduleTypeGroupResponse,
} from "@/apis/place/types/dto";
import { CardWithImageSmall } from "@/components/common/Cards/CardWithImageSmall";
import { categoryImageMap } from "@/lib/utils";
import { useCourseContext } from "@/providers/course-provider";
import { roomUidStorage } from "@/utils/web-storage/room-uid";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export interface PlacesContainerProps {
  placesData: ScheduleTypeGroupResponse;
  scheduleInfo: any;
}

export const PlaceContainer: React.FC<PlacesContainerProps> = ({
  placesData,
  scheduleInfo,
}) => {
  const { places } = placesData;

  const router = useRouter();
  const { selectedPlaceInfo, setSelectedPlaceInfo, setAutoData } =
    useCourseContext();
  const handleCardClick = (place: PlaceResponseDto) => {
    setSelectedPlaceInfo(place);
    router.push(
      `add-course/detail/edit?roomUid=${roomUidStorage?.get()?.roomUid}`
    );
  };

  return (
    <div className="flex flex-wrap items-center justify-start gap-x-[12px] mx-[20px] gap-y-[20px] my-[20px]">
      {places.map((place) => (
        <div key={place?.id} className="flex flex-col items-center">
          <CardWithImageSmall
            origin={place?.origin}
            place={place?.name}
            link={place?.url}
            rating={place?.starGrade}
            reviewCount={place?.reviewCount}
            images={place?.placeImageUrls?.contents}
            category={scheduleInfo}
            onButtonClick={() => handleCardClick(place)}
          />
        </div>
      ))}
    </div>
  );
};
