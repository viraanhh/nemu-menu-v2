import React from "react";
import Image from "next/image";
import { Select } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

import FoodCard from "@/components/food-card";

const KELURAHAN = [
  "Tembalang",
  "Kramas",
  "Bulusan",
  "Meteseh",
  "Rowosari",
  "Sendangmulyo",
  "Kedungmundu",
  "Sambiroto",
  "Mangunharjo",
  "Tandang",
  "Sendangguwo",
  "Jangli",
];

const HomePage = () => {
  return (
    <div className="w-full min-h-screen bg-[#efefef]">
      {/* Hero */}
      <div className="">
        <div className="relative w-full">
          <Image
            src="/assets/images/hero-image.png"
            width={1920}
            height={1080}
            alt="Hero Background Image"
            className="h-[35rem] object-cover z-0"
          />
          <div className="z-10 absolute top-[41%] left-[11%]">
            <input
              className="bg-white w-[70rem] rounded-full px-7 py-4 outline-none"
              placeholder="Cari makanan favoritmu..."
            />
          </div>
        </div>
      </div>
      {/* Food Card List */}
      <div className="py-12 px-10">
        {/* Header */}
        <div className="flex flex-row font-medium items-center space-x-3">
          <p className="text-lg">3 tempat makan enak di</p>
          <div className="relative">
            <Select
              className={clsx(
                "block cursor-pointer w-44 text-base appearance-none rounded-lg border-none bg-white px-3 py-1.5 text-black",
                "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25",
                // Make the text of each option black on Windows
                "*:text-black"
              )}
            >
              {KELURAHAN.map((kelurahan, index) => (
                <option key={index} value={kelurahan}>
                  {kelurahan}
                </option>
              ))}
            </Select>
            <ChevronDownIcon
              className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-black/60"
              aria-hidden="true"
            />
          </div>
        </div>
        <div className="mt-10">
          <FoodCard
            restaurantId="1"
            restaurantName="Sate"
            restaurantAddress="Jl. Menuju IPK 4"
            restaurantImage="/assets/images/sate.png"
          />
        </div>
        {/* 3 Tempat Makan Baru */}
        <div className="mt-16">
          <p className="text-lg font-medium">3 tempat makan yang baru buka</p>
          <div className="flex flex-row mt-10"></div>
          <FoodCard
            restaurantId="1"
            restaurantName="Sate"
            restaurantAddress="Jl. Menuju IPK 4"
            restaurantImage="/assets/images/sate.png"
          />
        </div>
      </div>
      {/* UMKM Banner */}
      <div className="pt-32 pb-40 px-30">
        <div className="w-full bg-[#E07416] p-5 rounded-lg">
          <div className="flex flex-row space-x-10">
            {/* Image */}
            <Image
              src="/assets/images/cfd.png"
              width={1920}
              height={1080}
              className="w-72 h-40 rounded-md"
              alt="Foto CFD"
            />
            <div className="mt-7 flex flex-col text-white">
                <p className="font-bold text-xl">Car Free Day: UMKM Tembalang</p>
                <p className="mt-1.5 font-medium">20 April 2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
