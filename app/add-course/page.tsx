import React from "react";
import { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";
import AddCourse from "./_components/AddCourse";

import { SuccessRoomResponse } from "@/apis/room/types/model";


type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const getRoom = async (roomUid: string): Promise<SuccessRoomResponse> => {
  const room = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/rooms/${roomUid}`
  ).then((res) => res.json());
  return room;
};

export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {

  const roomUid = searchParams.roomUid as string;
  const room = await getRoom(roomUid);

  return {
    title: `📮 함께 온 메세지 ‘${room.data.name}’에 초대합니다. 💌`,
    description: room.data.message,
    twitter: {
      card: "summary_large_image",
      title: `📮 함께 온 메세지 ‘${room.data.name}’에 초대합니다. 💌`,
      description: room.data.message,
      images: `${room.data.thumbnailLinks}`,
    },
    openGraph: {
      type: "website",
      title: `📮 함께 온 메세지 ‘${room.data.name}’에 초대합니다. 💌`,
      description: room.data.message,
      images: `${room.data.thumbnailLinks}`,
    },
  };
}


const AddCoursePage = async ({ searchParams }: Props) => {
  const hasRoomUid = !!searchParams.roomUid;
  const roomUid = searchParams.roomUid as string;

  const room = await getRoom(roomUid);

  if (hasRoomUid) return <AddCourse data={room.data} />;

  return redirect("/");
};

export default AddCoursePage;
