import React from "react";
import AddCourse from "./_components/AddCourse";
import { redirect } from "next/navigation";

interface IAddCoursePageProps {
  searchParams: { roomUid: string };
}

const AddCoursePage = ({ searchParams }: IAddCoursePageProps) => {
  const hasRoomUid = !!searchParams.roomUid;

  if (hasRoomUid) {
    return <AddCourse />;
  }

  return redirect("/");
};

export default AddCoursePage;
