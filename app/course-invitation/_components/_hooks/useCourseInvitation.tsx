'use client'
import React, { useState } from "react";

export type StepType = "course" | "invitation";

const useCourseInvitation = () => {
  const [step, setStep] = useState<StepType>("course");

  return {
    step,
    setStep,
  };
};

export default useCourseInvitation;
