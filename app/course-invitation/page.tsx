import React from "react";
import CourseInvitation from "./_components/CourseInvitation";
import { BadgeProvider } from "@/providers/badge-store-provider";

const CourseInvitationPage = () => {
  return (
    <BadgeProvider>
      <CourseInvitation />
    </BadgeProvider>
  );
};

export default CourseInvitationPage;
