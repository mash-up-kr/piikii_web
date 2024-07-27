import { CarouselApi } from "@/components/ui/carousel";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const SLIDE_LIST = [
  {
    comp: (
      <Image
        src="/gif/onboarding_1.gif"
        width={375}
        height={370}
        alt="onboarding_1.gif"
      />
    ),
  },
  {
    comp: (
      <Image
        src="/gif/onboarding_2.gif"
        width={375}
        height={370}
        alt="onboarding_2.gif"
      />
    ),
  },
  {
    comp: (
      <Image
        src="/gif/onboarding_3.gif"
        width={375}
        height={370}
        alt="onboarding_3.gif"
      />
    ),
  },
];

const useHome = () => {
  const router = useRouter();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    const idx = current - 1;

    if (idx < 2) {
      api?.scrollTo(idx + 1);
      return;
    } else {
      router.push("/course-invitation");
    }
  };

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return {
    api,
    current,
    setApi,
    setCurrent,
    handleNext,
  };
};

export default useHome;
