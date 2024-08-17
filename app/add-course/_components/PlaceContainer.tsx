import { ScheduleTypeGroupResponse } from "@/apis/place/types/dto";
import { CardWithImageSmall } from "@/components/common/Cards/CardWithImageSmall";

export interface PlacesContainerProps {
  placesData: ScheduleTypeGroupResponse;
  scheduleInfo: any;
}

export const PlaceContainer: React.FC<PlacesContainerProps> = ({
  placesData,
  scheduleInfo,
}) => {
  const { places } = placesData;

  return (
    <div className="flex flex-wrap items-center justify-start gap-x-[12px] mx-[20px] gap-y-[20px] my-[20px]">
      {places.map((place) => (
        <div key={place?.id} className="flex flex-col items-center">
          <CardWithImageSmall
            origin={place?.origin}
            place={place?.name}
            link={place?.url}
            rating={place?.starGrade?.toString()}
            reviewCount={place?.reviewCount}
            images={place?.placeImageUrls?.contents}
            category={scheduleInfo}
          />
        </div>
      ))}
    </div>
  );
};
