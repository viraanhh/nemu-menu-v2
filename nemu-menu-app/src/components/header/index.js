import React from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full bg-[#E07416] py-7 px-16 sticky top-0 z-30">
      <div className="w-full flex justify-between">
        <Link href="/">
          <Image
            src="/assets/images/nemumenu.png"
            alt="Logo NemuMenu"
            width={200}
            height={66}
          />
        </Link>
        <Link href="/profile">
          <Image
            src="/assets/images/user_profile.png"
            alt="User Profile Placeholder"
            width={32}
            height={32}
            className="rounded-full"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
