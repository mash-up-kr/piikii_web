"use client";
import React, { Children, memo } from "react";
import usePasswordKeypad from "./_hooks/usePasswordKeypad";
import Image from "next/image";

export interface PasswordKeypadProps {
  title?: string;
  subTitle?: string;
  onPasswordComplete: (password: string[]) => void;
}

const PasswordKeypad = ({
  title = "모임 비밀번호 생성",
  subTitle = "투표를 시작하거나 마감할 때 필요해요",
  onPasswordComplete,
}: PasswordKeypadProps) => {
  const { password, KEYPAD_DATA, handlePassword } = usePasswordKeypad({
    onPasswordComplete,
  });

  return (
    <>
      <div className="flex flex-col items-center">
        <p className="text-bold-20 text-neutral-900 text-center">{title}</p>
        <p className="mt-[4px] text-regular-14 text-neutral-600 text-center">
          {subTitle}
        </p>

        <div className="flex justify-between w-[124px] mt-[32px]">
          {Children.toArray(
            Array.from({ length: 4 })
              .fill(null)
              .map((_, index) => {
                return (
                  <>
                    <div
                      className={`rounded-[50px] ${
                        password[index] !== undefined
                          ? "bg-neutral-900"
                          : "bg-neutral-300"
                      }  w-[16px] h-[16px]`}
                    />
                  </>
                );
              })
          )}
        </div>

        <div className="grid grid-cols-3 mt-[32px] w-full">
          {Children.toArray(
            KEYPAD_DATA.map((item) => {
              const { type, id, value } = item;
              return (
                <>
                  {type === "value" ? (
                    <button
                      type="button"
                      className={`h-[60px] flex items-center justify-center ${
                        id !== "empty" && "cursor-pointer"
                      }`}
                      onClick={() => handlePassword(id)}
                    >
                      {value}
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="flex justify-center items-center cursor-pointer"
                      onClick={() => handlePassword(id)}
                    >
                      <Image src={value} alt={value} width={24} height={24} />
                    </button>
                  )}
                </>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default memo(PasswordKeypad);
