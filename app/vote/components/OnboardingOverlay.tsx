import NavigationBar from "@/components/common/Navigation/NavigationBar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  onStartVote: () => void;
}

export default function OnboardingOverlay({ onStartVote }: Props) {
  const router = useRouter();
  return (
    <div className="fixed top-0 h-dvh w-[375px] backdrop-blur-2xl bg-black bg-opacity-50 z-[1000] flex flex-col justify-center items-center">
      <div className="absolute right-[20px] top-[53px] rounded-[24px] bg-secondary-like-700 py-[10px] w-[286px] text-medium-14 text-secondary-like-100 text-center">
        모두 이해했다면 눌러서 투표를 시작해주세요
      </div>

      <NavigationBar
        leftSlot={
          <button onClick={() => router.back()}>
            <Image
              src="/svg/ic_chevron_left.svg"
              width={24}
              height={24}
              alt="left-chevron"
            />
          </button>
        }
        rightSlot={
          <button
            className="transition group flex gap-[4px] py-[8px] px-[12px] border-[1px] border-solid border-neutral-300 rounded-[10px] text-semibold-12 hover:bg-neutral-200"
            onClick={() => onStartVote()}
          >
            <span className="text-white group-hover:text-neutral-700">
              투표시작
            </span>
            <Image
              src="/png/ic_twotone_how_to_vote_1_16.png"
              width={16}
              height={16}
              alt="how-to-vote"
            />
          </button>
        }
        className="top-0 bg-transparent pl-[12px] pr-[20px]"
      />

      <Image
        src="/svg/vote-onboarding-center.svg"
        width={297}
        height={193}
        alt="vote-onboarding-center"
      />

      <Image
        src="/svg/vote-onboarding-bottom.svg"
        width={146}
        height={109}
        alt="vote-onboarding-bottom"
        className="absolute bottom-0"
      />
    </div>
  );
}
