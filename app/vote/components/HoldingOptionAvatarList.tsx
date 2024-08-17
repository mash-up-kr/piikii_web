import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { CategoryChoiceState, PlaceOption, VoteType } from "../model";

interface Props {
  list: PlaceOption[];
  voteState: VoteType;
}

export default function HoldingOptionAvatarList({ list, voteState }: Props) {
  console.log(voteState);
  return (
    <div className="flex gap-x-[24px] w-full">
      <AnimatePresence mode="popLayout">
        {list.map((item, index) => {
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
              <motion.div
                layout
                className="rounded-full w-[52px] h-[52px]"
                animate={
                  index === 0 && voteState === VoteType.VOTE_HOLD
                    ? "active"
                    : "inactive"
                }
                variants={{
                  active: { borderWidth: 2, borderColor: "#FFFFFF" },
                  inactive: { borderWidth: 0 },
                }}
              >
                <Image
                  src={item.placeImageUrls.contents[0] ?? "/png/food.png"}
                  width={52}
                  height={52}
                  alt="option-image"
                  className="w-full h-full rounded-full"
                />
                <p className="overflow-ellipsis whitespace-nowrap overflow-hidden text-center text-neutral-900 mt-[8px]">
                  {item.name}
                </p>
              </motion.div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
