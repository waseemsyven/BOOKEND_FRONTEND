import Image from "next/image";

export default function NotFound() {
  return (
    <div className="w-full h-screen bg-[#FAFCFF] flex justify-center items-center relative">
      <Image
        src="/bookend_ai_logo.svg"
        alt="close"
        className="absolute top-16 left-16"
        width={148}
        height={24}
      />
      <Image src="/404_image.svg" alt="close" width={664} height={664} />
    </div>
  );
}
