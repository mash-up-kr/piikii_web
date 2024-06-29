import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { CategoryChoiceState } from "../model";

interface Props {
  list: any[];
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
                src={item.images[0]}
                width={52}
                height={52}
                alt="option-image"
                className="rounded-full"
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
