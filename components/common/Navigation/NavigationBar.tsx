interface Props {
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  title?: string;
}

export default function NavigationBar({ leftSlot, rightSlot, title }: Props) {
  return (
    <nav className="flex items-center py-[16px] justify-between">
      <div>{leftSlot}</div>
      {title && <h1 className="flex-1">{title}</h1>}
      <div>{rightSlot}</div>
    </nav>
  );
}
