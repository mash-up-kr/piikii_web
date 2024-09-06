import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ChipProps {
  title: string;
  selected?: boolean;
  onClick?: () => void;
}

export const CategoryChip: React.FC<ChipProps> = ({
  title,
  selected,
  onClick,
}) => {
  return (
    <Badge
      className={cn(
        "max-w-[87px] h-[37px] flex-shrink-0 text-medium-14 cursor-pointer",
        selected ? "bg-secondary-700 text-neutral-0" : "text-neutral-700"
      )}
      onClick={onClick}
    >
      {title}
    </Badge>
  );
};
