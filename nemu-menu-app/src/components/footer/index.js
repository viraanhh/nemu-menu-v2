import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full py-7 px-16 bg-[#3C3C3C]">
      <div className="relative">
        <div className="flex flex-col ">
          <Image
            src="/assets/images/nemumenu.png"
            alt="Logo NemuMenu"
            width={200}
            height={66}
          />
          <div className="text-white mt-10">
            <p className="font-bold">Tempat berburu pengalaman kuliner</p>
            <div className="mt-2.5">
              <p className="text-gray-200">Jl. Sarjana Teknik no.12A, Tembalang, Semarang, 10004</p>
              <p className="text-gray-200">081234567891 | info@nemumenu.com</p>
            </div>
          </div>
        </div>
        <div className="absolute right-5 bottom-0">
          <div className="flex flex-row space-x-5">
            <Image
              src="/assets/images/tiktok-fill_svgrepo.com.png"
              alt="Tiktok Icon"
              width={48}
              height={48}
            />
            <Image
              src="/assets/images/email_svgrepo.com.png"
              alt="Gmail Icon"
              width={48}
              height={48}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
