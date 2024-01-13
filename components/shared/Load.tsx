import Image from "next/image";

const Loading = () => {
  return (
    <div className="w-full bg-dark-1 min-h-screen flex flex-col items-center justify-center relative">
      <div className="flex items-center justify-center">
        <Image
          src="/assets/logo/logo-icon-color.svg"
          alt="loading-logo"
          width={100}
          height={100}
          className="object-contain"
        />
      </div>
      <div className="absolute flex items-center justify-center bottom-10">
        <p className="text-gray-1 text-base-regular">
          Threads-Clone 2024: Coding Love in Every Thread. © SW 2024.
        </p>
      </div>
    </div>
  );
};

export default Loading;
