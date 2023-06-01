"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
const Logo = () => {
  const router = useRouter();
  return (
    <div onClick={() => router.push("/")}>

      <Image

        src="/images/logo1.png"
        className="hidden md:block cursor-pointer"
        width="100"
        height="100"
        alt="Logo"
      />
    </div>
  );
};

export default Logo;
