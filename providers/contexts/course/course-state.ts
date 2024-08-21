import { PlaceAutoCompleteResponse } from "@/apis/origin-place/types/dto";
import {
  PlaceResponseDto,
  ScheduleTypeGroupResponse,
  SuccessPlaceTypeGroupResponse,
} from "@/apis/place/types/dto";
import { RoomResponse } from "@/apis/room/types/model";
import { ScheduleResponse } from "@/apis/schedule/types/model";
import { PlaceAutoCompleteData } from "@/components/common/Cards/CardForCopiedContent";
import React, { useState } from "react";

const useCourseState = () => {
  const [roomInfo, setRoomInfo] = useState<RoomResponse | null>(null);
  const [categoryList, setCategoryList] = useState<ScheduleResponse[] | null>(
    null
  );
  const [roomPlacesInfo, setRoomPlacesInfo] = useState<
    ScheduleTypeGroupResponse[] | null
  >(null);
  const [autoPlaceInfo, setAutoPlaceInfo] = useState<PlaceResponseDto[]>([]);
  const [selectedPlaceInfo, setSelectedPlaceInfo] =
    useState<PlaceResponseDto | null>(null);
  const [isClipboardText, setIsClipboardText] = useState(false);
  const [autoData, setAutoData] = useState<PlaceAutoCompleteResponse | null>(
    null
  );

  return {
    roomInfo,
    autoPlaceInfo,
    roomPlacesInfo,
    categoryList,
    selectedPlaceInfo,
    isClipboardText,
    setRoomInfo,
    setAutoPlaceInfo,
    setRoomPlacesInfo,
    setCategoryList,
    setSelectedPlaceInfo,
    setIsClipboardText,
    autoData,
    setAutoData,
  };
};

export default useCourseState;
