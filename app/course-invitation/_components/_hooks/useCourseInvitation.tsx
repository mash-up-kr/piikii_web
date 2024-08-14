"use client";
import { useState } from "react";

export type StepType = "course" | "invitation";

const useCourseInvitation = () => {
  const [step, setStep] = useState<StepType>("course");

  const handleStep = (_step: StepType) => {
    setStep(_step);
  };

  return {
    step,
    setStep,
    handleStep,
  };
};

export default useCourseInvitation;
