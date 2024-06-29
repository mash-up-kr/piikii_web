import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-full flex-col gap-[16px]">
      <p className="text-black-22">이것은 홈이다</p>
      <p className="text-semibold-20">아직은 개발중!</p>
      <p className="text-regular-16">뚝딱뚝딱</p>
    </div>
  );
}
