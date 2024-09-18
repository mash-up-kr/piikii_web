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
      className="fixed overflow-hidden top-0 h-dvh max-w-[430px] w-full backdrop-blur-2xl z-[1100] flex flex-col justify-center items-center"
      style={{
        background:
          "linear-gradient(270deg, rgba(100, 41, 200, 0.80) 40%, rgba(229, 47, 47, 0.80) 60%)",
        WebkitBackdropFilter: "blur(40px)",
      }}
    >
      <div
        className="fixed blur-[60px] h-dvh max-w-[430px] w-full z-[1101] left-0"
        style={{
          background:
            "linear-gradient(270deg, rgba(100, 41, 200, 0.80) 40%, rgba(229, 47, 47, 0.80) 60%)",
        }}
      />

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

      <div
        className="flex flex-col justify-center items-center flex-1 h-full w-full px-[60px] cursor-pointer z-[1102]"
        onClick={onStartVote}
      >
        <Image
          src="/svg/vote-onboarding-center.svg"
          width={297}
          height={193}
          alt="vote-onboarding-center"
          unoptimized
          className="z-[1102]"
        />

        <Image
          src="/svg/vote-onboarding-bottom.svg"
          width={146}
          height={109}
          alt="vote-onboarding-bottom"
          className="absolute bottom-0 z-[1102]"
          unoptimized
        />
      </div>
    </div>
  );
}
