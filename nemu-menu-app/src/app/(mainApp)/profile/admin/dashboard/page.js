"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MdAdd } from "react-icons/md";
import { useRouter } from "next/navigation";

import RestaurantCardDashboard from "@/components/restaurant-card-dashboard";

const AdminRestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchRestaurants();
  }, []);

  // Listen for route changes to refresh data when returning from edit page
  useEffect(() => {
    const handleRouteChange = () => {
      fetchRestaurants();
    };

    // Listen for focus events to refresh when returning to the page
    window.addEventListener("focus", handleRouteChange);

    return () => {
      window.removeEventListener("focus", handleRouteChange);
    };
  }, []);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/restaurants`,
        {
          cache: "no-store", // Ensure fresh data
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setRestaurants(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      setError("Failed to load restaurants. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRestaurant = (restaurantId) => {
    // Remove the deleted restaurant from the state
    setRestaurants((prev) =>
      prev.filter((restaurant) => restaurant.id !== parseInt(restaurantId))
    );
  };

  const handleRefresh = () => {
    fetchRestaurants();
  };

  if (loading) {
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
        <div className="mt-10 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E07416]"></div>
        </div>
      </div>
    );
  }

  if (error) {
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
        <div className="mt-10 flex flex-col items-center justify-center space-y-4">
          <div className="text-red-500 text-center">
            <p className="text-lg font-medium">Error</p>
            <p className="text-sm">{error}</p>
          </div>
          <button
            onClick={fetchRestaurants}
            className="bg-[#E07416] hover:bg-[#c96711] text-white px-4 py-2 rounded-md transition-colors duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen py-20 px-32">
      <div className="w-full flex justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl text-[#E07416] font-bold">
            Manajemen Restoran
          </h1>
          <button
            onClick={handleRefresh}
            className="text-[#E07416] hover:text-[#c96711] text-sm underline transition-colors duration-300"
            title="Refresh restaurants list"
          >
            Refresh
          </button>
        </div>
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
        {restaurants.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            <p className="text-lg">No restaurants found</p>
            <p className="text-sm">
              Click &quot;Tambah Restoran&quot; to add your first restaurant
            </p>
          </div>
        ) : (
          restaurants.map((restaurant) => (
            <RestaurantCardDashboard
              key={restaurant.id}
              restaurantId={restaurant.id}
              restaurantAddress={restaurant.alamat}
              restaurantImage={restaurant.restaurant_image_new}
              restaurantName={restaurant.nama}
              onDelete={handleDeleteRestaurant}
              restaurant={restaurant}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default AdminRestaurantsPage;
