interface Props {
  /** 네비게이션 바 왼쪽 슬롯 - Padding은 외부에서 주입 */
  leftSlot?: React.ReactNode;

  /** 네비게이션 바 오른쪽 슬롯 - Padding은 외부에서 주입 */
  rightSlot?: React.ReactNode;

  title?: string;
}

export default function NavigationBar({ leftSlot, rightSlot, title }: Props) {
  return (
    <nav className="fixed w-[400px] flex items-center py-[16px] justify-between h-[56px] bg-neutral-0">
      <div>{leftSlot}</div>
      {title && (
        <h1 className="flex-1 text-center text-neutral-700 text-semibold-15">
          {title}
        </h1>
      )}
      <div>{rightSlot}</div>
    </nav>
  );
}
