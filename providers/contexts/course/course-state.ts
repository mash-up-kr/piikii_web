import { PlaceAutoCompleteResponse } from "@/apis/origin-place/types/dto";
import { RoomResponse } from "@/apis/room/types/model";
import { ScheduleResponse } from "@/apis/schedule/types/model";
import { PlaceAutoCompleteData } from "@/components/common/Cards/CardForCopiedContent";
import React, { useState } from "react";

const useCourseState = () => {
  const [roomInfo, setRoomInfo] = useState<RoomResponse | null>(null);
  const [categoryList, setCategoryList] = useState<ScheduleResponse[] | null>(
    null
  );
  const [placeInfo, setPlaceInfo] = useState<PlaceAutoCompleteData[]>([]);
  const [isClipboardText, setIsClipboardText] = useState(false);
  const [autoData, setAutoData] = useState<PlaceAutoCompleteResponse | null>(
    null
  );

  return {
    roomInfo,
    categoryList,
    placeInfo,
    isClipboardText,
    setRoomInfo,
    setCategoryList,
    setPlaceInfo,
    setIsClipboardText,
    autoData,
    setAutoData,
  };
};

export default useCourseState;
