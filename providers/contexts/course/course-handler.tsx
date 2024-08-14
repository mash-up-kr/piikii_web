import React from "react";
import useCourseState from "./course-state";
import { PlaceAutoCompleteData } from "@/components/common/Cards/CardForCopiedContent";

const useCourseHandler = () => {
  const {
    roomInfo,
    roomPlacesInfo,
    categoryList,
    isClipboardText,
    autoPlaceInfo,
    autoData,
    setCategoryList,
    setIsClipboardText,
    setRoomInfo,
    setRoomPlacesInfo,
    setAutoPlaceInfo,
    setAutoData,
  } = useCourseState();

  const addPlaceInfo = (newPlace: PlaceAutoCompleteData) => {
    setAutoPlaceInfo((prevPlaces) => [...prevPlaces, newPlace]);
  };

  return {
    addPlaceInfo,
    roomInfo,
    roomPlacesInfo,
    categoryList,
    isClipboardText,
    autoPlaceInfo,
    autoData,
    setCategoryList,
    setIsClipboardText,
    setRoomInfo,
    setRoomPlacesInfo,
    setAutoPlaceInfo,
    setAutoData,
  };
};

export default useCourseHandler;
