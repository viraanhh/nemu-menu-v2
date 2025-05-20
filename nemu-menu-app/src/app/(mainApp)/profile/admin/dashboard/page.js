import React from "react";
import Link from "next/link";
import { MdAdd } from "react-icons/md";

import RestaurantCardDashboard from "@/components/restaurant-card-dashboard";

const AdminRestaurantsPage = () => {
  return (
    <div className="w-full min-h-screen py-20 px-32">
      <div className="w-full flex justify-between">
        <h1 className="text-2xl text-[#E07416] font-bold">
          Manajemen Restoran
        </h1>
        <Link
          href="/profile/admin/dashboard/restoran/create"
          className="bg-[#E07416] hover:bg-[#c96711] transition-colors duration-300 w-1/5 py-2.5 rounded-md shadow-lg shadow-gray-300"
        >
          <div className="flex flex-row space-x-1.5 items-center justify-center text-white">
            <MdAdd className="w-5 h-5" />
            <p className="text-sm font-medium">Tambah Restoran</p>
          </div>
        </Link>
      </div>
      {/* List */}
      <div className="mt-10 flex flex-col space-y-10">
        <RestaurantCardDashboard
          restaurantId="1"
          restaurantAddress="Jl. Menuju IPK 4"
          restaurantImage="/assets/images/steak.png"
          restaurantName="Steak"
        />
        <RestaurantCardDashboard
          restaurantId="2"
          restaurantAddress="Jl. Menuju IPK 4"
          restaurantImage="/assets/images/sate.png"
          restaurantName="Sate"
        />
        <RestaurantCardDashboard
          restaurantId="3"
          restaurantAddress="Jl. Menuju IPK 4"
          restaurantImage="/assets/images/nasi_goreng.png"
          restaurantName="Nasi Goreng"
        />
      </div>
    </div>
  );
};

export default AdminRestaurantsPage;
