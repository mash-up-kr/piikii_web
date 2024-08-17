"use client";

import Image from "next/image";

export default function FullScreenLoader({ label }: { label?: string }) {
  return (
    <div className="bg-white bg-opacity-75 z-50 flex items-center justify-center h-dvh flex-col">
      <Image
        src="/gif/loading.gif"
        width={140}
        height={24}
        alt="loading"
        unoptimized
      />
      {label && (
        <div className="text-neutral-900 text-bold-22 text-center whitespace-pre-line mt-[-30px]">
          {label}
        </div>
      )}
    </div>
  );
}
