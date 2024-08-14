import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { CategoryChoiceState, PlaceOption } from "../model";

interface Props {
  list: PlaceOption[];
}

export default function HoldingOptionAvatarList({ list }: Props) {
  return (
    <div className="flex overflow-y-scroll gap-x-[24px] w-full">
      <AnimatePresence mode="popLayout">
        {list.map((item, _) => {
          if (item.state !== CategoryChoiceState.HOLD) return null;

          return (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col w-[52px] gap-y-[8px] text-semibold-11"
            >
              <Image
                src={item.placeImageUrls.contents[0] ?? "/png/food.png"}
                width={52}
                height={52}
                alt="option-image"
                className="rounded-full w-[52px] h-[52px]"
              />
              <p className="overflow-ellipsis text-center text-neutral-900">
                {item.name}
              </p>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
