"use client";
import React from "react";
import { StepType } from "../_hooks/useCourseInvitation";
import BasisSection from "@/components/common/Layout/BasisSection";
import NavigationBar from "@/components/common/Navigation/NavigationBar";

interface InvitationProps {
  handleStep: (step: StepType) => void;
}

const Invitation = ({ handleStep }: InvitationProps) => {
  return (
    <>
      <NavigationBar
        leftSlot={
          <div onClick={() => handleStep("course")}>모임 순서정하기</div>
        }
      />
      <BasisSection className="flex flex-col">
        <p>초대장 만들기</p>
      </BasisSection>
    </>
  );
};

export default Invitation;
