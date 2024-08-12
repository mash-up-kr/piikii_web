"use client";

import React, { createContext, useContext, ReactNode } from "react";
import useCourseHandler from "./contexts/course/course-handler";

const CourseContext = createContext<
  ReturnType<typeof useCourseHandler> | undefined
>(undefined);

export const CourseProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const {
    addPlaceInfo,
    categoryList,
    isClipboardText,
    placeInfo,
    roomInfo,
    autoData,
    setCategoryList,
    setIsClipboardText,
    setPlaceInfo,
    setRoomInfo,
    setAutoData,
  } = useCourseHandler();

  return (
    <CourseContext.Provider
      value={{
        roomInfo,
        setRoomInfo,
        categoryList,
        setCategoryList,
        placeInfo,
        setPlaceInfo,
        addPlaceInfo,
        isClipboardText,
        setIsClipboardText,
        autoData,
        setAutoData,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourseContext = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourseContext must be used within a CourseProvider");
  }
  return context;
};
