import React from "react";
import Image from "next/image";

const MenuPage = () => {
  return (
    <div className="w-full min-h-screen py-20 px-32">
      <h1 className="text-[#E07416] font-bold">Nabila Steak</h1>
      {/* Container List Menu */}
      <div className="mt-3 w-full border border-black rounded-lg px-5 py-2.5">
        <div className="w-full flex flex-row space-x-5">
          <div className="flex flex-col">
            <Image
              src="/assets/images/menu steak.png"
              width={1920}
              height={1080}
              alt="Gambar Menu 1"
              className="cursor-pointer max-w-32 max-h-52 object-cover"
            />
            <p className="mt-1.5 text-sm text-center">1</p>
          </div>
        </div>
      </div>
      {/* Image Full Preview - TODO: WILL ADD STATE MANAGEMENT TO HANDLE MULTIPLE IMAGES */}
      <div className="w-full flex items-center justify-center py-10">
        <Image
          src="/assets/images/menu steak.png"
          width={1920}
          height={1080}
          alt="Gambar Menu 1 - Full Size"
          className="cursor-pointer w-full h-full max-w-[30rem] max-h-[43.9rem] object-cover"
        />
      </div>
      {/* Banner */}
      <div className="w-full bg-[#E07416] rounded-md">
        <p className="text-white py-3 px-5">Harga dapat berubah sewaktu-waktu tanpa pemberitahuan terlebih dahulu.</p>
      </div>
    </div>
  );
};

export default MenuPage;
