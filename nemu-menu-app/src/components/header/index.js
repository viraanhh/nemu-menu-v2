"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { useUser } from "@/contexts/UserContext";

const Header = () => {
  const { user } = useUser();
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
        {!!user && (
          <Link href="/profile">
            <Image
              src={
                user?.user_profile_new
                  ? user.user_profile_new
                  : "/assets/images/user_profile.png"
              }
              alt="User Profile Placeholder"
              width={1920}
              height={1080}
              className="rounded-full w-10 h-10"
            />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
