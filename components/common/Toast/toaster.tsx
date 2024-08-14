"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/common/Toast/toast";
import { useToast } from "@/components/common/Toast/use-toast";
import Image from "next/image";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        variants = "warning",
        ...props
      }) {
        return (
          <Toast
            className="bg-primary-200 max-w-[335px] h-[52px] rounded-[28px] bg-neutral-800 opacity-[0.6] mb-[24px]"
            key={id}
            {...props}
          >
            <div className="flex">
              {variants === "warning" && (
                <Image
                  className="mr-[8px]"
                  src="/png/ic_exclamation_circle_24.png"
                  alt="ic_exclamation_circle_24.png"
                  width={24}
                  height={24}
                />
              )}
              {title && <ToastTitle className="text-white">{title}</ToastTitle>}
              {description && (
                <ToastDescription className="text-white">
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
