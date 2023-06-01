"use client";

import Image from "next/image";
interface AvatarProps {
  src?: string | null | undefined
}

const Avatar: React.FC<AvatarProps> = ({
  src
}) => {
  return (
    <div>
      <Image
        src={src || "/images/avatar.png"}
        className="rounded-full"
        width="20"
        height="20"
        alt="Avatar"
      />
    </div>
  );
};

export default Avatar;
