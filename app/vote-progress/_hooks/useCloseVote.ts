import { useUpdateVoteDeadline } from "@/apis/vote/VoteApi.mutation";
import { VOTE_API_QUERY_KEY } from "@/apis/vote/VoteApi.query";
import { useToast } from "@/components/common/Toast/use-toast";
import useRoomUid from "@/hooks/useRoomUid";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useCloseVote = () => {
  const toast = useToast();
  const roomUid = useRoomUid();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isPasswordSheetOpen, setIsPasswordSheetOpen] = useState(false);
  const [password, _] = useState("");

  const { mutate: updateVoteDeadline } = useUpdateVoteDeadline({
    options: {
      onSuccess: () => {
        roomUid &&
          queryClient.invalidateQueries({
            queryKey: VOTE_API_QUERY_KEY.GET_VOTE_STATUS({ roomUid }),
          });

        router.replace(`/vote-finish`);
        toast.toast({ title: "투표가 종료되었어요", duration: 2000 });
      },
      onError: () => {
        toast.toast({ title: "투표 종료에 실패했어요", duration: 500 });
      },
    },
  });

  const isPasswordCorrect = (passwordConfirm: string[]) => {
    return password === JSON.stringify(passwordConfirm);
  };

  const handlePassword = (_password: string[]) => {
    const passwordString = _password.join("");

    updateVoteDeadline({
      roomUid: roomUid ?? "",
      payload: {
        password: passwordString,
        voteDeadline: dayjs().add(1, "second").toISOString(),
      },
    });

    if (isPasswordCorrect(_password)) {
      console.log("Correct Password");
      alert(JSON.stringify(_password));
    } else {
      toast.toast({ title: "비밀번호가 일치하지 않아요", duration: 500 });
    }
  };

  const onPasswordSheetOpen = () => {
    setIsPasswordSheetOpen(true);
  };

  const onPasswordSheetClose = () => {
    setIsPasswordSheetOpen(false);
  };

  const onSubmit = () => {
    onPasswordSheetOpen();
  };

  return {
    isPasswordSheetOpen,
    passwordSheet: {
      isOpen: isPasswordSheetOpen,
      onClose: onPasswordSheetClose,
      onOpen: onPasswordSheetOpen,
    },

    onSubmit,
    handlePassword,
  };
};

export default useCloseVote;
