import React from "react";
import useCourseState from "./course-state";
import { PlaceAutoCompleteData } from "@/components/common/Cards/CardForCopiedContent";

const useCourseHandler = () => {
  const {
    roomInfo,
    categoryList,
    isClipboardText,
    placeInfo,
    autoData,
    setCategoryList,
    setIsClipboardText,
    setRoomInfo,
    setPlaceInfo,
    setAutoData,
  } = useCourseState();

  const addPlaceInfo = (newPlace: PlaceAutoCompleteData) => {
    setPlaceInfo((prevPlaces) => [...prevPlaces, newPlace]);
  };

  return {
    addPlaceInfo,
    roomInfo,
    categoryList,
    isClipboardText,
    placeInfo,
    autoData,
    setCategoryList,
    setIsClipboardText,
    setRoomInfo,
    setPlaceInfo,
    setAutoData,
  };
};

export default useCourseHandler;
