import { CarouselApi } from "@/components/ui/carousel";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export const TEMP_ITEM = {
  comp: (
    <div className="h-[100px]">
      <Image
        src="/png/ic_picture_24.png"
        width={100}
        height={100}
        alt="ic_picture_24.png"
      />
    </div>
  ),
};

export const TEMP_SLIDE_ITEMS = Array.from({ length: 3 }).fill(
  TEMP_ITEM.comp
) as ReactNode[];

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
        router.push("/course-invitation")
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
