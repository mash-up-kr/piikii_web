import React from "react";
import { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";
import AddCourse from "./_components/AddCourse";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const roomUid = searchParams.roomUid;

  const room = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/rooms/${roomUid}`
  ).then((res) => res.json());

  return {
    title: room.data.name,
    description: room.data.message,
    twitter: {
      card: "summary_large_image",
      title: room.data.name,
      description: room.data.message,
      images: `${room.data.thumbnailLinks}`,
    },
    openGraph: {
      type: "website",
      title: room.data.name,
      description: room.data.message,
      images: `${room.data.thumbnailLinks}`,
    },
  };
}

const AddCoursePage = ({ searchParams }: Props) => {
  const hasRoomUid = !!searchParams.roomUid;

  if (hasRoomUid) return <AddCourse />;

  return redirect("/");
};

export default AddCoursePage;
