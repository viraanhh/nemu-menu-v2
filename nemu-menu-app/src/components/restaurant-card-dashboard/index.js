"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { HiPencil } from "react-icons/hi2";
import { FaTrash } from "react-icons/fa6";

const RestaurantCardDashboard = ({
  restaurantId,
  restaurantName,
  restaurantAddress,
  restaurantImage,
  onDelete,
  restaurant,
}) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleEditClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/profile/admin/dashboard/restoran/${restaurantId}/edit`);
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Authentication required. Please login again.");
        router.push("/login");
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/restaurants/${restaurantId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();

      // Call the onDelete callback to update the parent component
      if (onDelete) {
        onDelete(restaurantId);
      }

      // Show success message
      alert("Restaurant deleted successfully!");
    } catch (error) {
      console.error("Error deleting restaurant:", error);

      if (
        error.message.includes("Cannot delete restaurant with existing reviews")
      ) {
        alert(
          "Cannot delete this restaurant because it has existing reviews. Please remove all reviews first."
        );
      } else if (
        error.message.includes("401") ||
        error.message.includes("Unauthorized")
      ) {
        alert("Authentication failed. Please login again.");
        router.push("/login");
      } else if (
        error.message.includes("403") ||
        error.message.includes("Forbidden")
      ) {
        alert("You don't have permission to delete restaurants.");
      } else {
        alert("Failed to delete restaurant. Please try again.");
      }
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const cancelDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDeleteConfirm(false);
  };

  return (
    <div className="relative">
      <Link href={`/profile/admin/dashboard/restoran/${restaurantId}/edit`}>
        <div className="bg-white w-[48.5rem] rounded-lg hover:shadow-lg transition-shadow duration-300">
          <div className="flex flex-row space-x-5">
            <Image
              src={restaurantImage}
              width={1920}
              height={1080}
              alt="Restaurant thumbnail"
              className="w-[23rem] h-52 rounded-md object-cover"
              onError={(e) => {
                e.target.src = "/assets/images/default-restaurant.png";
              }}
            />
            <div className="w-full relative py-4">
              <h3 className="text-2xl text-[#E07416] font-bold">
                {restaurantName}
              </h3>
              <p className="mt-2 text-[#404347]">{restaurantAddress}</p>
              <div className="absolute right-7 bottom-2.5">
                <div className="flex flex-row space-x-2.5 items-center">
                  <button
                    className="cursor-pointer rounded-full p-3 bg-white hover:bg-gray-100 transition-colors duration-300"
                    onClick={handleEditClick}
                    title="Edit Restaurant"
                  >
                    <HiPencil className="text-gray-700" />
                  </button>
                  <button
                    className="cursor-pointer rounded-full p-3 bg-white hover:bg-gray-100 transition-colors duration-300"
                    onClick={handleDeleteClick}
                    disabled={isDeleting}
                    title="Delete Restaurant"
                  >
                    <FaTrash
                      className={`${
                        isDeleting ? "text-gray-400" : "text-red-700"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Confirm Delete
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete &quot;{restaurantName}&quot;? This
              action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-300"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantCardDashboard;
