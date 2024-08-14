import { Card, CardContent } from "@/components/ui/card";
import { CardInfoProps, PendingCardListProps } from "@/model";
import Image from "next/image";

export const PendingCard: React.FC<Omit<CardInfoProps, "origin">> = ({
  place,
  images,
}) => {
  return (
    <Card className="flex flex-col items-center justify-center w-[52px] h-[77px]">
      <CardContent className="flex flex-col gap-y-[8px]">
        <div className="flex">
          <Image
            src={images[0]}
            alt={place}
            className="rounded-[26px]"
            width={52}
            height={52}
            priority
          />
        </div>
        <span className="w-[52px] h-[17px] text-[11px] font-semibold text-[#1B1F27] text-ellipsis overflow-hidden inline-block whitespace-nowrap">
          {place}
        </span>
      </CardContent>
    </Card>
  );
};

//카드가 여러 개일 경우
export const PendingCardList: React.FC<PendingCardListProps> = ({ cards }) => {
  return (
    <div className={`flex ${cards.length > 1 ? "gap-x-[24px]" : ""}`}>
      {cards?.map((card, index) => (
        <PendingCard key={index} place={card?.place} images={card?.images} />
      ))}
    </div>
  );
};

export default PendingCard;
