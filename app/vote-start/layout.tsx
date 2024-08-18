import placeApi from "@/apis/place/PlaceApi";
import { PLACE_API_QUERY_KEY } from "@/apis/place/PlaceApi.query";
import roomApi from "@/apis/room/RoomApi";
import { ROOM_API_QUERY_KEY } from "@/apis/room/RoomApi.query";
import { getQueryClient } from "@/components/providers/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { cookies } from "next/headers";

export default function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const roomUid = cookieStore.get("roomUid");

  const queryClient = getQueryClient();

  if (roomUid?.value) {
    queryClient.prefetchQuery({
      queryKey: ROOM_API_QUERY_KEY.GET_ROOM(roomUid.value),
      queryFn: () => roomApi.readRoom(roomUid.value),
    });

    queryClient.prefetchQuery({
      queryKey: PLACE_API_QUERY_KEY.GET_PLACES({
        roomUid: roomUid.value,
      }),
      queryFn: () =>
        placeApi.getPlaces({
          roomUid: roomUid.value,
        }),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
