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
    <div
      className="fixed overflow-hidden top-0 h-dvh bg-black bg-opacity-50 max-w-[430px] w-full backdrop-blur-2xl z-[1100] flex flex-col justify-center items-center"
      style={{
        WebkitBackdropFilter: "blur(40px)",
      }}
    >
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
        className="top-0 bg-transparent pl-[12px] pr-[20px] z-[1110]"
      />

      <div className="flex flex-col justify-center items-center flex-1 h-full w-full px-[60px] cursor-pointer z-[1102]">
        <Image
          src="/png/vote-overlay-img.png"
          width={296}
          height={424}
          alt="vote-onboarding-center"
          unoptimized
          className="z-[1102]"
        />
      </div>

      <div className="fixed bottom-[20px] w-full px-[20px] pt-[10px] z-[1110]">
        <button
          className="w-full rounded-[14px] border border-primary-700 bg-primary-700 py-[16px] text-neutral-0 text-semibold-16"
          onClick={onStartVote}
        >
          투표 시작
        </button>
      </div>
    </div>
  );
}
