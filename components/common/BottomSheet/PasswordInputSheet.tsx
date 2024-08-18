"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import PasswordKeypad from "../PasswordKeypad/PasswordKeypad";

export interface PasswordInputSheetProps {
  trigger?: React.ReactNode;
  isOpen: boolean;
  title: string;
  subTitle: string;
  onOpenChange?: (isOpen: boolean) => void;
  onInteractOutside?: () => void;
  onPasswordComplete: (password: string[]) => void;
}

/**
 * @props onInteractOutside: 오버레이 클릭
 * @props onOpenChange: open상태가 변경될때마다
 * @props onPasswordComplete: 패스워드 입력이 완료된 후 콜백
 */
export function PasswordInputSheet({
  trigger,
  isOpen,
  title,
  subTitle,
  onOpenChange,
  onInteractOutside,
  onPasswordComplete,
}: PasswordInputSheetProps) {
  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open: boolean) => {
        onOpenChange && onOpenChange(open);
      }}
    >
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}

      <SheetContent
        className="rounded-tl-[16px] rounded-tr-[16px] max-w-[375px] lg:mr-[0] xl:mr-[218px] w-full"
        side={"bottom"}
        onInteractOutside={() => {
          onInteractOutside && onInteractOutside();
        }}
      >
        <SheetHeader className="items-center justify-center pt-[8px] pb-[32px]">
          <SheetTitle>
            <div className="w-[34px] h-[5px] rounded-[4px] bg-neutral-200" />
          </SheetTitle>
        </SheetHeader>

        <PasswordKeypad
          title={title}
          subTitle={subTitle}
          onPasswordComplete={onPasswordComplete}
        />
      </SheetContent>
    </Sheet>
  );
}
