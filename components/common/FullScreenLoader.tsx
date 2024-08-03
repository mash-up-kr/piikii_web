import Image from "next/image";

export default function FullScreenLoader() {
  return (
    <div className="bg-white bg-opacity-75 z-50 flex items-center justify-center h-dvh">
      <Image src="/gif/loading.gif" width={140} height={24} alt="loading" />
    </div>
  );
}
