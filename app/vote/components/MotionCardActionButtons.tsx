import { Button } from "@/components/common/Button/Button";
import { cn } from "@/lib/utils";
import { CategoryChoiceState, SwipeDirection, VoteType } from "../model";
import Image from "next/image";

const ICON_BUTTON_CLASSNAME =
  "bg-neutral-0 !w-[52px] !h-[52px] flex justify-center items-center !p-0 rounded-[18px] shadow-s" as const;

interface Props {
  voteType: VoteType;
  onClickButton: (direction: SwipeDirection) => void;
}

export default function MotionCardActionButtons({
  voteType,
  onClickButton,
}: Props) {
  return (
    <div className="flex justify-center items-center gap-x-[8px]">
      <Button
        className={cn(
          "hover:bg-secondary-dislike-100 active:bg-secondary-dislike-200",
          ICON_BUTTON_CLASSNAME
        )}
        onClick={() => onClickButton(SwipeDirection.LEFT)}
      >
        <Image src="/svg/icon-x-mono.svg" width={27} height={27} alt="X" />
      </Button>

      {voteType === VoteType.VOTE_PENDING && (
        <Button
          className={cn(
            "text-black-16 hover:bg-neutral-500 active:bg-neutral-600 group",
            ICON_BUTTON_CLASSNAME
          )}
          onClick={() => onClickButton(SwipeDirection.UP)}
        >
          <span className="text-neutral-600 group-hover:text-neutral-0">
            보류
          </span>
        </Button>
      )}

      <Button
        className={cn(
          " hover:bg-secondary-like-100 active:bg-secondary-like-200",
          ICON_BUTTON_CLASSNAME
        )}
        onClick={() => onClickButton(SwipeDirection.RIGHT)}
      >
        <Image
          src="/svg/icon-circle-empty-mono.svg"
          width={27}
          height={27}
          alt="O"
        />
      </Button>
    </div>
  );
}
