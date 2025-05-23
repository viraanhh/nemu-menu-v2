"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Rating from "@mui/material/Rating";
import { MdLocalPhone } from "react-icons/md";
import { PiPencilSimpleLine } from "react-icons/pi";
import { PiImageDuotone } from "react-icons/pi";

import { useUser } from "@/contexts/UserContext";

const RestoranPage = () => {
  const router = useRouter();

  const { user } = useUser();

  const [restaurant, setRestaurant] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewsError, setReviewsError] = useState(null);

  const params = useParams();
  const restaurantId = params?.id;

  useEffect(() => {
    if (restaurantId) {
      fetchRestaurant();
      fetchReviews();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      setError(null);
    } catch (error) {
      console.error("Error fetching restaurant:", error);
      setError("Failed to load restaurant data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      setReviewsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/restaurants/${restaurantId}/reviews`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setReviews(data);
      setReviewsError(null);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviewsError("Failed to load reviews. Please try again.");
    } finally {
      setReviewsLoading(false);
    }
  };

  // Calculate average rating from reviews
  const calculateAverageRating = () => {
    if (!reviews || reviews.length === 0) return 0;

    const totalRating = reviews.reduce((sum, review) => {
      const avgReviewRating =
        ((review.rasa_makanan || 0) +
          (review.suasana || 0) +
          (review.harga_rasa || 0) +
          (review.pelayanan || 0) +
          (review.kebersihan || 0)) /
        5;
      return sum + avgReviewRating;
    }, 0);

    return (totalRating / reviews.length).toFixed(1);
  };

  // Format opening hours
  const formatOpeningHours = () => {
    if (!restaurant) return "";

    const { hari_buka_awal, hari_buka_akhir, jam_buka, jam_tutup } = restaurant;
    return `${hari_buka_awal}-${hari_buka_akhir} (${jam_buka} - ${jam_tutup})`;
  };

  // Format price range
  const formatPriceRange = (priceRange) => {
    switch (priceRange) {
      case "<50000":
        return "< Rp50.000";
      case "50000-100000":
        return "Rp50.000 - Rp100.000";
      case "100000-200000":
        return "Rp100.000 - Rp200.000";
      case "200000-500000":
        return "Rp200.000 - Rp500.000";
      case ">500000":
        return "> Rp500.000";
      default:
        return priceRange;
    }
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

  const averageRating = calculateAverageRating();

  return (
    <div className="w-full min-h-screen py-20 px-32">
      <div>
        {/* Informasi Restoran */}
        <div className="flex flex-row space-x-7">
          {!!restaurant.restaurant_image_new ? (
            <Image
              src={restaurant.restaurant_image_new}
              width={1920}
              height={1080}
              className="w-[25rem] h-[21.6rem] object-cover rounded-lg"
              alt="Gambar Restoran"
            />
          ) : (
            <PiImageDuotone className="w-[25rem] h-[21.6rem] rounded-lg text-[#E07416]" />
          )}
          <div className="w-full flex flex-col">
            {/* Nama Restoran */}
            <h1 className="text-4xl font-bold text-[#E07416]">
              {restaurant.nama}
            </h1>
            {/* Description */}
            <div className="mt-5 relative">
              <div className="bg-white w-full rounded-lg space-y-4 px-10 pt-7 pb-16 z-20 relative">
                {/* Alamat */}
                <p className="text-[#404347]">{restaurant.alamat}</p>
                <div className="flex flex-row items-center space-x-10">
                  {/* Waktu Buka */}
                  <p className="text-[#404347]">{formatOpeningHours()}</p>
                  {/* No Telp */}
                  <div className="flex flex-row items-center space-x-3">
                    <MdLocalPhone />
                    <p className="text-[#404347]">{restaurant.nomor_telepon}</p>
                  </div>
                </div>
                {/* Range Harga */}
                <div className="flex flex-row space-x-2.5">
                  <p className="text-[#404347]">
                    {formatPriceRange(restaurant.range_harga)}
                  </p>
                  <p className="text-[#404347]">/orang</p>
                </div>
                {/* Buttons */}
                <div className="mt-12 flex flex-row space-x-5">
                  {!!user && (
                    <button
                      className="bg-[#E07416] hover:bg-[#c96711] transition-colors duration-300 font-medium w-1/5 text-white py-2.5 rounded-md cursor-pointer"
                      onClick={() =>
                        router.push(`/restoran/${restaurantId}/tulis-ulasan`)
                      }
                    >
                      <div className="w-full flex items-center justify-center">
                        <div className="flex flex-row items-center">
                          <p className="mr-2">Tulis Ulasan</p>
                          <PiPencilSimpleLine className="w-5 h-5" />
                        </div>
                      </div>
                    </button>
                  )}
                  <button
                    className="bg-[#BCAE0E] hover:bg-[#b6a70d] transition-colors duration-300 font-medium w-1/5 text-white py-2.5 rounded-md cursor-pointer"
                    onClick={() =>
                      router.push(`/restoran/${restaurantId}/menu`)
                    }
                  >
                    Lihat Menu
                  </button>
                </div>
              </div>
              {/* Rating */}
              <div className="absolute -top-14 right-0 z-0 bg-[#E07416] py-4 px-6 rounded-md">
                <p className="text-2xl font-bold text-white">
                  {averageRating || "0.0"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* List Review */}
        <div className="mt-28">
          <h2 className="text-2xl font-bold text-[#E07416] mb-8">
            Ulasan ({reviews.length})
          </h2>

          {reviewsLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E07416]"></div>
            </div>
          ) : reviewsError ? (
            <div className="text-red-500 text-center py-10">
              <p>{reviewsError}</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-gray-500 text-center py-20">
              <p className="text-lg">Belum ada ulasan untuk restoran ini.</p>
              <p className="text-sm mt-2">
                Jadilah yang pertama memberikan ulasan!
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {reviews.map((review) => {
                const reviewAverageRating =
                  ((review.rasa_makanan || 0) +
                    (review.suasana || 0) +
                    (review.harga_rasa || 0) +
                    (review.pelayanan || 0) +
                    (review.kebersihan || 0)) /
                  5;

                return (
                  <div key={review.id} className="flex flex-row space-x-5">
                    <Image
                      src={
                        review.user?.user_profile_new ||
                        "/assets/images/default-user-profile.png"
                      }
                      width={1920}
                      height={1080}
                      alt="Profile Icon"
                      className="w-28 h-28 object-cover rounded-full"
                    />
                    <div className="relative w-full">
                      <div className="bg-white w-full px-7 pt-6 pb-12 rounded-lg">
                        <div className="max-w-4/5">
                          <h3 className="text-3xl text-[#E07416] font-bold">
                            {review.judul}
                          </h3>
                          {/* Menu yang dipesan */}
                          {review.menu && (
                            <div className="mt-2.5">
                              <p className="font-semibold">
                                {review.user?.username || "User"} memesan:{" "}
                                {review.menu}
                              </p>
                            </div>
                          )}
                          <div className="pt-5 space-y-2.5 text-justify text-[#404347]">
                            <p>{review.deskripsi_review}</p>
                          </div>
                          {/* All Rating */}
                          <div className="mt-7 space-y-3">
                            <div>
                              <p className="font-bold mb-1.5">Rasa Makanan</p>
                              <Rating
                                name="read-only"
                                value={review.rasa_makanan || 0}
                                readOnly
                              />
                            </div>
                            <div>
                              <p className="font-bold mb-1.5">Suasana</p>
                              <Rating
                                name="read-only"
                                value={review.suasana || 0}
                                readOnly
                              />
                            </div>
                            <div>
                              <p className="font-bold mb-1.5">
                                Harga Dibandingkan Rasa
                              </p>
                              <Rating
                                name="read-only"
                                value={review.harga_dibandingkan_rasa || 0}
                                readOnly
                              />
                            </div>
                            <div>
                              <p className="font-bold mb-1.5">Pelayanan</p>
                              <Rating
                                name="read-only"
                                value={review.pelayanan || 0}
                                readOnly
                              />
                            </div>
                            <div>
                              <p className="font-bold mb-1.5">Kebersihan</p>
                              <Rating
                                name="read-only"
                                value={review.kebersihan || 0}
                                readOnly
                              />
                            </div>
                          </div>
                          {/* Foto Gambar */}
                          {(review.photo_1_new ||
                            review.photo_2_new ||
                            review.photo_3_new ||
                            review.photo_4_new ||
                            review.photo_5_new) && (
                            <div className="mt-7 flex flex-row space-x-5">
                              {review.photo_1_new && (
                                <Image
                                  src={review.photo_1_new}
                                  width={1920}
                                  height={1080}
                                  className="w-24 h-24 object-cover rounded-md"
                                  alt="Gambar Ulasan 1"
                                />
                              )}
                              {review.photo_2_new && (
                                <Image
                                  src={review.photo_2_new}
                                  width={1920}
                                  height={1080}
                                  className="w-24 h-24 object-cover rounded-md"
                                  alt="Gambar Ulasan 2"
                                />
                              )}
                              {review.photo_3_new && (
                                <Image
                                  src={review.photo_3_new}
                                  width={1920}
                                  height={1080}
                                  className="w-24 h-24 object-cover rounded-md"
                                  alt="Gambar Ulasan 3"
                                />
                              )}
                              {review.photo_4_new && (
                                <Image
                                  src={review.photo_4_new}
                                  width={1920}
                                  height={1080}
                                  className="w-24 h-24 object-cover rounded-md"
                                  alt="Gambar Ulasan 4"
                                />
                              )}
                              {review.photo_5_new && (
                                <Image
                                  src={review.photo_4_new}
                                  width={1920}
                                  height={1080}
                                  className="w-24 h-24 object-cover rounded-md"
                                  alt="Gambar Ulasan 5"
                                />
                              )}
                            </div>
                          )}
                          {/* Review Date */}
                          <div className="mt-5 text-sm text-gray-500">
                            <p>
                              Diulas pada{" "}
                              {new Date(review.created_at).toLocaleDateString(
                                "id-ID",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* Rating Banner */}
                      <div className="absolute top-0 right-0 bg-[#E07416] py-4 px-6 rounded-md">
                        <p className="text-2xl font-bold text-white">
                          {reviewAverageRating.toFixed(1)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestoranPage;
