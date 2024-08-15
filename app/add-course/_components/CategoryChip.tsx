import { Badge } from "@/components/ui/badge";

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
      className="max-w-[87px] h-[37px] flex-shrink-0 text-[14px] cursor-pointer"
      variant={selected ? "selected" : "default"}
      onClick={onClick}
    >
      {title}
    </Badge>
  );
};
