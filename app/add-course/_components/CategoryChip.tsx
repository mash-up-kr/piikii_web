import { Badge } from "@/components/ui/badge";

interface ChipProps {
  title: string;
}

export const CategoryChip: React.FC<ChipProps> = ({ title }) => {
  return (
    <Badge className="max-w-[87px] h-[37px] flex-shrink-0 text-[14px]">
      {title}
    </Badge>
  );
};
