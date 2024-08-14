import { PlaceAutoCompleteResponse } from "@/apis/origin-place/types/dto";
import { TotalScheduleResponse } from "@/apis/place/types/dto";
import { RoomResponse } from "@/apis/room/types/model";
import { ScheduleResponse } from "@/apis/schedule/types/model";
import { PlaceAutoCompleteData } from "@/components/common/Cards/CardForCopiedContent";
import React, { useState } from "react";

const useCourseState = () => {
  const [roomInfo, setRoomInfo] = useState<RoomResponse | null>(null);
  const [categoryList, setCategoryList] = useState<ScheduleResponse[] | null>(
    null
  );
  const [roomPlacesInfo, setRoomPlacesInfo] =
    useState<TotalScheduleResponse | null>(null);
  const [autoPlaceInfo, setAutoPlaceInfo] = useState<PlaceAutoCompleteData[]>(
    []
  );
  const [isClipboardText, setIsClipboardText] = useState(false);
  const [autoData, setAutoData] = useState<PlaceAutoCompleteResponse | null>(
    null
  );

  return {
    roomInfo,
    roomPlacesInfo,
    categoryList,
    autoPlaceInfo,
    isClipboardText,
    setRoomInfo,
    setRoomPlacesInfo,
    setCategoryList,
    setAutoPlaceInfo,
    setIsClipboardText,
    autoData,
    setAutoData,
  };
};

export default useCourseState;
