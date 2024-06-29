'use client'
import React from "react";
import Course from "./Course/Course";
import Invitation from "./Invitation/Invitation";
import useCourseInvitation from "./_hooks/useCourseInvitation";

const CourseInvitation = () => {
  const { step } = useCourseInvitation();
  return (
    <>
      {/* <NavigationBar
        title="샘플"
        leftSlot={<div>LEFT</div>}
        rightSlot={<div>RIGHT</div>}
      /> */}
      {step === "course" && <Course />}
      {step === "invitation" && <Invitation />}
    </>
  );
};

export default CourseInvitation;
