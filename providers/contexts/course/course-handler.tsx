import React from "react";
import useCourseState from "./course-state";
import { PlaceAutoCompleteData } from "@/components/common/Cards/CardForCopiedContent";
import {
  PlaceResponseDto,
  ScheduleTypeGroupResponse,
} from "@/apis/place/types/dto";
import { PlaceAutoCompleteResponse } from "@/apis/origin-place/types/dto";

const useCourseHandler = () => {
  const {
    roomInfo,
    autoPlaceInfo,
    roomPlacesInfo,
    categoryList,
    isClipboardText,
    selectedPlaceInfo,
    autoData,
    setCategoryList,
    setIsClipboardText,
    setRoomInfo,
    setAutoPlaceInfo,
    setRoomPlacesInfo,
    setSelectedPlaceInfo,
    setAutoData,
  } = useCourseState();

  const addPlaceInfo = (newPlace: PlaceResponseDto) => {
    setRoomPlacesInfo((roomPlacesInfo) => {
      // roomPlacesInfo가 null이 아닌 경우만 진행
      if (roomPlacesInfo) {
        return roomPlacesInfo.map((group) => {
          if (group.scheduleId === newPlace.scheduleId) {
            return {
              ...group,
              places: [...group.places, newPlace],
            };
          }

          return group;
        });
      }

      // 만약 roomPlacesInfo가 null인 경우에는 그대로 반환
      return roomPlacesInfo;
    });
  };

  return {
    addPlaceInfo,
    autoPlaceInfo,
    roomInfo,
    roomPlacesInfo,
    categoryList,
    isClipboardText,
    selectedPlaceInfo,
    autoData,
    setCategoryList,
    setIsClipboardText,
    setRoomInfo,
    setAutoPlaceInfo,
    setRoomPlacesInfo,
    setSelectedPlaceInfo,
    setAutoData,
  };
};

export default useCourseHandler;
