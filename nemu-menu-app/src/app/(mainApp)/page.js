"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Select } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import clsx from "clsx";

import FoodCard from "@/components/food-card";

const KELURAHAN = [
  "Semua Lokasi",
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
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedKelurahan, setSelectedKelurahan] = useState("Semua Lokasi");

  useEffect(() => {
    fetchRestaurants();
  }, []);

  // Filter restaurants whenever search query or selected kelurahan changes
  useEffect(() => {
    filterRestaurants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurants, searchQuery, selectedKelurahan]);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/restaurants`,
        {
          cache: "no-store",
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

  const filterRestaurants = () => {
    let filtered = restaurants;

    // Filter by search query (restaurant name)
    if (searchQuery.trim()) {
      filtered = filtered.filter((restaurant) =>
        restaurant.nama.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by kelurahan (location in address)
    if (selectedKelurahan !== "Semua Lokasi") {
      filtered = filtered.filter((restaurant) =>
        restaurant.alamat
          .toLowerCase()
          .includes(selectedKelurahan.toLowerCase())
      );
    }

    setFilteredRestaurants(filtered);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKelurahanChange = (e) => {
    setSelectedKelurahan(e.target.value);
  };

  // Get restaurants for the selected kelurahan (for the header count)
  const getRestaurantsCountForLocation = () => {
    if (selectedKelurahan === "Semua Lokasi") {
      return restaurants.length;
    }
    return restaurants.filter((restaurant) =>
      restaurant.alamat.toLowerCase().includes(selectedKelurahan.toLowerCase())
    ).length;
  };

  // Get the latest 3 restaurants based on updated_at timestamp
  const getLatestRestaurants = () => {
    return [...restaurants]
      .sort((a, b) => {
        // Sort by updated_at (most recent first)
        const dateA = new Date(a.updated_at);
        const dateB = new Date(b.updated_at);
        return dateB - dateA;
      })
      .slice(0, 3);
  };

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
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="py-12 px-10 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E07416]"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="py-12 px-10 flex flex-col items-center justify-center space-y-4">
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
      )}

      {/* Food Card List */}
      {!loading && !error && (
        <div className="py-12 px-10">
          {/* Header */}
          <div className="flex flex-row font-medium items-center space-x-3">
            <p className="text-lg">
              {getRestaurantsCountForLocation()} tempat makan enak di
            </p>
            <div className="relative">
              <Select
                value={selectedKelurahan}
                onChange={handleKelurahanChange}
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

          {/* Filtered Restaurants */}
          <div className="mt-10 space-y-6">
            {filteredRestaurants.length === 0 ? (
              <div className="text-center text-gray-500 py-10">
                <p className="text-lg">Tidak ada restoran ditemukan</p>
                <p className="text-sm">
                  Coba ubah pencarian atau filter lokasi Anda
                </p>
              </div>
            ) : (
              <div className="flex flex-row space-x-10 space-y-4">
                {filteredRestaurants.map((restaurant) => (
                  <FoodCard
                    key={restaurant.id}
                    restaurantId={restaurant.id.toString()}
                    restaurantName={restaurant.nama}
                    restaurantAddress={restaurant.alamat}
                    restaurantImage={restaurant.restaurant_image_new}
                  />
                ))}
              </div>
            )}
          </div>

          {/* 3 Tempat Makan Baru */}
          {restaurants.length > 0 && (
            <div className="mt-16">
              <p className="text-lg font-medium">
                3 tempat makan yang baru buka
              </p>
              <div className="mt-10 space-y-6">
                <div className="flex flex-row space-x-10 space-y-4">
                  {getLatestRestaurants().map((restaurant) => (
                    <FoodCard
                      key={`latest-${restaurant.id}`}
                      restaurantId={restaurant.id}
                      restaurantName={restaurant.nama}
                      restaurantAddress={restaurant.alamat}
                      restaurantImage={restaurant.restaurant_image_new}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

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
