import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HiPencil } from "react-icons/hi2";
import { FaTrash } from "react-icons/fa6";

const RestaurantCardDashboard = ({
  restaurantId,
  restaurantName,
  restaurantAddress,
  restaurantImage,
}) => {
  return (
    <Link href={`/profile/admin/dashboard/restoran/${restaurantId}/edit`}>
      <div className="bg-white w-[48.5rem] rounded-lg">
        <div className="flex flex-row space-x-5">
          <Image
            src={restaurantImage}
            width={1920}
            height={1080}
            alt="Restaurant thumbnail"
            className="w-[23rem] h-52 rounded-md object-cover"
          />
          <div className="w-full relative py-4">
            <h3 className="text-2xl text-[#E07416] font-bold">
              {restaurantName}
            </h3>
            <p className="mt-2 text-[#404347]">{restaurantAddress}</p>
            <div className="absolute right-7 bottom-2.5">
              <div className="flex flex-row space-x-2.5 items-center">
                <button className="cursor-pointer rounded-full p-3 bg-white hover:bg-gray-100 transition-colors duration-300">
                  <HiPencil className="text-gray-700" />
                </button>
                <button className="cursor-pointer rounded-full p-3 bg-white hover:bg-gray-100 transition-colors duration-300">
                  <FaTrash className="text-red-700" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCardDashboard;
