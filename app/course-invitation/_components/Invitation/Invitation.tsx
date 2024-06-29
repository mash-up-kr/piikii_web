"use client";
import React from "react";
import { StepType } from "../_hooks/useCourseInvitation";

interface InvitationProps {
  handleStep: (step: StepType) => void;
}

const Invitation = ({ handleStep }: InvitationProps) => {
  return <div>Invitation</div>;
};

export default Invitation;
