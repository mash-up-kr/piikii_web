import { ScheduleTypeGroupResponse } from "@/apis/place/types/dto";
import { CardWithImageSmall } from "@/components/common/Cards/CardWithImageSmall";

export interface PlacesContainerProps {
  placesData: ScheduleTypeGroupResponse;
}

export const PlaceContainer: React.FC<PlacesContainerProps> = ({
  placesData,
}) => {
  const { places } = placesData;
  console.log(places, "========");

  return (
    <div className="flex flex-wrap gap-x-4">
      {places.map((place) => (
        <div key={place.id} className="w-[calc(50%-16px)] mb-4">
          <CardWithImageSmall
            origin={place.origin}
            place={place.name}
            link={place.url}
            rating={place.starGrade?.toString()}
            reviewCount={100} //임시 data, response에 없음
            images={place.placeImageUrls.contents}
          />
        </div>
      ))}
    </div>
  );
};
