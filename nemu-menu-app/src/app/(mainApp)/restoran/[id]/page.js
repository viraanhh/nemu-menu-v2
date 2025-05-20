"use client";

import React from "react";
import Image from "next/image";
import Rating from "@mui/material/Rating";
import { MdLocalPhone } from "react-icons/md";
import { PiPencilSimpleLine } from "react-icons/pi";

const RestoranPage = () => {
  return (
    <div className="w-full min-h-screen py-20 px-32">
      <div>
        {/* Informasi Restoran */}
        <div className="flex flex-row space-x-7">
          <Image
            src="/assets/images/steak.png"
            width={1920}
            height={1080}
            className="w-[25rem] h-[21.6rem] object-cover rounded-lg"
            alt="Gambar Restoran"
          />
          <div className="w-full flex flex-col">
            {/* Nama Restoran */}
            <h1 className="text-4xl font-bold text-[#E07416]">Nabila Steak</h1>
            {/* Description */}
            <div className="mt-5 relative">
              <div className="bg-white w-full rounded-lg space-y-4 px-10 pt-7 pb-16 z-20 relative">
                {/* Alamat */}
                <p className="text-[#404347]">
                  Jl. Menuju IPK 4, Tembalang, Semarang
                </p>
                <div className="flex flex-row items-center space-x-10">
                  {/* Waktu Buka */}
                  <p className="text-[#404347]">Senin-Jumat (12.00 - 20.00)</p>
                  {/* No Telp */}
                  <div className="flex flex-row items-center space-x-3">
                    <MdLocalPhone />
                    <p className="text-[#404347]">08191995999</p>
                  </div>
                </div>
                {/* Range Harga */}
                <div className="flex flex-row space-x-2.5">
                  <p className="text-[#404347]">Rp10.000 - Rp25.000</p>
                  <p className="text-[#404347]">/orang</p>
                </div>
                {/* Buttons */}
                <div className="mt-12 flex flex-row space-x-5">
                  <button className="bg-[#E07416] hover:bg-[#c96711] transition-colors duration-300 font-medium w-1/5 text-white py-2.5 rounded-md cursor-pointer">
                    <div className="w-full flex items-center justify-center">
                      <div className="flex flex-row items-center">
                        <p className="mr-2">Tulis Ulasan</p>
                        <PiPencilSimpleLine className="w-5 h-5" />
                      </div>
                    </div>
                  </button>
                  <button className="bg-[#BCAE0E] hover:bg-[#b6a70d] transition-colors duration-300 font-medium w-1/5 text-white py-2.5 rounded-md cursor-pointer">
                    Lihat Menu
                  </button>
                </div>
              </div>
              {/* Rating */}
              <div className="absolute -top-14 right-0 z-0 bg-[#E07416] py-4 px-6 rounded-md">
                <p className="text-2xl font-bold text-white">5.0</p>
              </div>
            </div>
          </div>
        </div>
        {/* List Review */}
        <div className="mt-28">
          {/* TODO: Make it a separate component */}
          {/* Review Component */}
          <div className="flex flex-row space-x-5">
            <Image
              src="/assets/images/dummy-avatar.png"
              width={1920}
              height={1080}
              alt="Profile Icon"
              className="w-28 h-29 object-cover rounded-full"
            />
            <div className="relative w-full">
              <div className="bg-white w-full px-7 pt-6 pb-12 rounded-lg">
                <div className="max-w-4/5">
                  <h3 className="text-3xl text-[#E07416] font-bold">
                    Murce bangett! Bapak Ibu nya ramah!
                  </h3>
                  {/* Menu yang dipesan */}
                  <div className="mt-2.5">
                    <p className="font-semibold">
                      Putri memesan: Steak ayam, milkshake
                    </p>
                  </div>
                  <div className="pt-5 space-y-2.5 text-justify text-[#404347]">
                    <p>
                      Daging ayamnya empuk dan juicy di dalam, tapi tetap renyah
                      banget di luar—pas digigit tuh kriuknya berasa! Bumbunya
                      juga meresap sampai ke dalam, gak hambar. Saus steak-nya
                      cocok banget, ada rasa gurih dan sedikit manis yang
                      nge-blend sama ayamnya. Side dish-nya juga oke, kentangnya
                      garing dan sayurnya masih segar.
                    </p>
                    <p>
                      Overall, ini salah satu steak ayam krispi terenak yang
                      pernah aku coba. Worth it banget buat harga segitu!
                    </p>
                  </div>
                  {/* All Rating */}
                  <div className="mt-7 space-y-3">
                    <div>
                      <p className="font-bold mb-1.5">Rasa Makanan</p>
                      <Rating name="read-only" value={5} readOnly />
                    </div>
                    <div>
                      <p className="font-bold mb-1.5">Suasana</p>
                      <Rating name="read-only" value={5} readOnly />
                    </div>
                    <div>
                      <p className="font-bold mb-1.5">Harga Dibandingkan Rasa</p>
                      <Rating name="read-only" value={5} readOnly />
                    </div>
                    <div>
                      <p className="font-bold mb-1.5">Pelayanan</p>
                      <Rating name="read-only" value={5} readOnly />
                    </div>
                    <div>
                      <p className="font-bold mb-1.5">Kebersihan</p>
                      <Rating name="read-only" value={5} readOnly />
                    </div>
                  </div>
                  {/* Foto Gambar */}
                  <div className="mt-7 flex flex-row space-x-5">
                    <Image
                      src="/assets/images/steak.png"
                      width={1920}
                      height={1080}
                      className="w-24 h-24 object-cover rounded-md"
                      alt="Gambar Ulasan 1"
                    />
                     <Image
                      src="/assets/images/sate.png"
                      width={1920}
                      height={1080}
                      className="w-24 h-24 object-cover rounded-md"
                      alt="Gambar Ulasan 2"
                    />
                  </div>
                </div>
              </div>
              {/* Rating Banner */}
              <div className="absolute top-0 right-0 bg-[#E07416] py-4 px-6 rounded-md">
                <p className="text-2xl font-bold text-white">5.0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestoranPage;
