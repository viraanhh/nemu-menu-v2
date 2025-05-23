"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

const MenuPage = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [menuImages, setMenuImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const params = useParams();
  const restaurantId = params?.id;

  useEffect(() => {
    if (restaurantId) {
      fetchRestaurant();
    }
  }, [restaurantId]);

  const fetchRestaurant = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/restaurants/${restaurantId}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setRestaurant(data);

      // Extract menu images from the restaurant data
      const availableMenus = [];
      for (let i = 1; i <= 5; i++) {
        const menuKey = `menu_${i}_new`;
        if (data[menuKey]) {
          availableMenus.push({
            id: i,
            url: data[menuKey],
            alt: `Menu ${i}`,
          });
        }
      }

      setMenuImages(availableMenus);

      // Set default selected image to index 0 (first image)
      if (availableMenus.length > 0) {
        setSelectedImageIndex(0);
      }

      setError(null);
    } catch (error) {
      console.error("Error fetching restaurant:", error);
      setError("Failed to load restaurant data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen py-20 px-32 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E07416]"></div>
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div className="w-full min-h-screen py-20 px-32 flex flex-col justify-center items-center">
        <div className="text-red-500 text-center mb-4">
          <p className="text-lg font-medium">Error</p>
          <p className="text-sm">{error || "Restaurant not found"}</p>
        </div>
        <button
          onClick={() => window.history.back()}
          className="bg-[#E07416] hover:bg-[#c96711] text-white px-4 py-2 rounded-md transition-colors duration-300"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (menuImages.length === 0) {
    return (
      <div className="w-full min-h-screen py-20 px-32">
        <h1 className="text-[#E07416] font-bold text-2xl">{restaurant.nama}</h1>
        <div className="mt-10 text-center">
          <p className="text-gray-600 text-lg">
            No menu images available for this restaurant.
          </p>
        </div>
        {/* Banner */}
        <div className="w-full bg-[#E07416] rounded-md mt-10">
          <p className="text-white py-3 px-5">
            Harga dapat berubah sewaktu-waktu tanpa pemberitahuan terlebih
            dahulu.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen py-20 px-32">
      <h1 className="text-[#E07416] font-bold text-2xl">{restaurant.nama}</h1>

      {/* Container List Menu */}
      <div className="mt-3 w-full border border-black rounded-lg px-5 py-2.5">
        <div className="w-full flex flex-row space-x-5 overflow-x-auto">
          {menuImages.map((menu, index) => (
            <div key={menu.id} className="flex flex-col flex-shrink-0">
              <div
                className={`cursor-pointer border-2 rounded-lg overflow-hidden transition-all duration-300 ${
                  selectedImageIndex === index
                    ? "border-[#E07416] shadow-lg"
                    : "border-transparent hover:border-gray-300"
                }`}
                onClick={() => handleImageClick(index)}
              >
                <Image
                  src={menu.url}
                  width={128}
                  height={208}
                  alt={menu.alt}
                  className="max-w-32 max-h-52 object-cover"
                />
              </div>
              <p className="mt-1.5 text-sm text-center font-medium">
                {menu.id}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Image Full Preview */}
      {menuImages.length > 0 && (
        <div className="w-full flex items-center justify-center py-10">
          <div className="relative">
            <Image
              src={menuImages[selectedImageIndex].url}
              width={1920}
              height={1080}
              alt={`${menuImages[selectedImageIndex].alt} - Full Size`}
              className="w-full h-full max-w-[30rem] max-h-[43.9rem] object-cover rounded-lg shadow-lg"
            />

            {/* Image counter */}
            <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
              {selectedImageIndex + 1} of {menuImages.length}
            </div>
          </div>
        </div>
      )}

      {/* Navigation arrows for large image (optional enhancement) */}
      {menuImages.length > 1 && (
        <div className="w-full flex justify-center space-x-4 mb-10">
          <button
            onClick={() =>
              setSelectedImageIndex((prev) =>
                prev > 0 ? prev - 1 : menuImages.length - 1
              )
            }
            className="cursor-pointer bg-[#E07416] hover:bg-[#c96711] text-white px-4 py-2 rounded-md transition-colors duration-300"
          >
            ← Previous
          </button>
          <button
            onClick={() =>
              setSelectedImageIndex((prev) =>
                prev < menuImages.length - 1 ? prev + 1 : 0
              )
            }
            className="cursor-pointer bg-[#E07416] hover:bg-[#c96711] text-white px-4 py-2 rounded-md transition-colors duration-300"
          >
            Next →
          </button>
        </div>
      )}

      {/* Banner */}
      <div className="w-full bg-[#E07416] rounded-md">
        <p className="text-white py-3 px-5">
          Harga dapat berubah sewaktu-waktu tanpa pemberitahuan terlebih dahulu.
        </p>
      </div>
    </div>
  );
};

export default MenuPage;
