"use client";
import CardWithImage, {
  CardWithDislike,
  CardWithLike,
} from "@/components/common/Cards/CardWithImage";
import { Size } from "@/interface";
import React from "react";

const CardComponentPage = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <CardWithImage />
      <div className="flex flex-row gap-x-5">
        <CardWithLike size={Size.Small} />
        <CardWithDislike size={Size.Large} />
      </div>
    </div>
  );
};

export default CardComponentPage;
