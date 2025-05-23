"use client";

import React, { useState, use, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Formik } from "formik";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { MdImage } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import Link from "next/link";
import Rating from "@mui/material/Rating";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";
import cuid from "cuid";

import { useUser } from "@/contexts/UserContext";
import { supabase } from "@/utils/supabase";

import "react-datepicker/dist/react-datepicker.css";

const TulisUlasanPage = (props) => {
  const router = useRouter();
  const { user, loading: userStateLoading } = useUser();

  const params = use(props.params);
  const restaurantId = params?.id;

  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [menuInputFocused, setMenuInputFocused] = useState(false);
  const [reviewImages, setReviewImages] = useState([]);

  const imageInputRef = useRef(null);

  useEffect(() => {
    if (!user && !userStateLoading) {
      router.back();
    }
  }, [user, router, userStateLoading]);

  useEffect(() => {
    if (restaurantId) {
      fetchRestaurant();
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

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newReviewImage = {
        id: Date.now(),
        file: file,
        name: file.name,
        uploading: false,
        preview: URL.createObjectURL(file),
      };
      setReviewImages((prev) => [...prev, newReviewImage]);
    }
  };

  const handleUploadReviewImages = async () => {
    const uploadedUrls = {};

    try {
      const bucketName = "nemu-menu";

      // Upload new menu images
      for (let i = 0; i < reviewImages.length; i++) {
        const reviewImage = reviewImages[i];
        const reviewIndex = i + 1;
        const imageFullPath = `/review/${restaurantId}/review_${reviewIndex}_${cuid()}.png`;

        const { data, error: uploadError } = await supabase.storage
          .from(bucketName)
          .upload(imageFullPath, reviewImage.file, {
            cacheControl: "3600",
            upsert: true,
          });

        if (uploadError) throw uploadError;

        const { data: imageUrl } = supabase.storage
          .from(bucketName)
          .getPublicUrl(imageFullPath);

        if (imageUrl?.publicUrl) {
          uploadedUrls[`photo_${reviewIndex}_new`] = imageUrl.publicUrl;
        }
      }

      return uploadedUrls;
    } catch (error) {
      console.error("Error uploading review images:", error);
      throw error;
    }
  };

  const removeReviewImage = (id) => {
    setReviewImages((prev) => prev.filter((review) => review.id !== id));
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="w-full min-h-screen py-20 px-32">
      <h1 className="text-4xl font-bold text-[#E07416]">{restaurant?.nama}</h1>
      <Formik
        initialValues={{
          judul: "",
          detail: "",
          menu: "",
          tanggalPergi: new Date(),
          harga: "<50000", // Default value added
          rasa: 0,
          suasana: 0,
          hargaDibandingkanRasa: 0,
          pelayanan: 0,
          kebersihan: 0,
        }}
        validate={(values) => {
          const errors = {};

          if (!values.judul) errors.judul = "Judul review harus diisi";

          if (!values.detail) errors.detail = "Detail review harus diisi";

          if (!values.menu) errors.menu = "Menu yang dipesan harus diisi";

          if (!values.tanggalPergi)
            errors.tanggalPergi = "Tanggal pergi harus diisi";

          if (!values.harga)
            errors.harga = "Range harga menu yang dipesan harus diisi";

          if (!values.rasa) errors.rasa = "Rating rasa harus diisi";

          if (!values.suasana) errors.suasana = "Rating suasana harus diisi";

          if (!values.hargaDibandingkanRasa)
            errors.hargaDibandingkanRasa =
              "Rating harga dibandingkan rasa harus diisi";

          if (!values.pelayanan)
            errors.pelayanan = "Rating pelayanan harus diisi";

          if (!values.kebersihan)
            errors.kebersihan = "Rating kebersihan harus diisi";

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setFormSubmitted(true);

          try {
            const token = localStorage.getItem("token");

            if (!token) {
              toast.error("Authentication required. Please login again.");
              router.push("/login");
              return;
            }

            // Show loading toast
            const loadingToast = toast.loading("Submitting your review...");

            // Prepare form data
            const reviewData = {
              judul: values.judul,
              deskripsi_review: values.detail,
              menu: values.menu,
              tanggal_pergi: values.tanggalPergi,
              harga_per_orang: values.harga,
              rasa_makanan: values.rasa,
              suasana: values.suasana,
              harga_dibandingkan_rasa: values.hargaDibandingkanRasa,
              pelayanan: values.pelayanan,
              kebersihan: values.kebersihan,
            };

            // Upload review images
            const reviewImageUrls = await handleUploadReviewImages();

            // Add new menu URLs
            Object.assign(reviewData, reviewImageUrls);

            console.log("reviewData", reviewData);

            const response = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/restaurants/${restaurantId}/reviews`,
              {
                method: "POST", // Changed from PATCH to POST
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(reviewData), // Fixed variable name
              }
            );

            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(
                errorData.message || `HTTP error! status: ${response.status}`
              );
            }

            const data = await response.json();

            // Dismiss loading toast and show success
            toast.dismiss(loadingToast);
            toast.success("Review successfully added!");

            router.back();
          } catch (error) {
            console.error("Error adding review:", error);

            toast.error("Failed to submit your review. Please try again.");

            if (
              error.message.includes("401") ||
              error.message.includes("Unauthorized")
            ) {
              router.push("/login");
            } else if (
              error.message.includes("403") ||
              error.message.includes("Forbidden")
            ) {
              toast.error("You don't have permission to create this review.");
            }
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldError,
          setFieldValue,
        }) => {
          const handleInputChange = (e) => {
            const { name } = e.target;

            if (formSubmitted && errors[name]) {
              setFieldError(name, undefined);
            }
            handleChange(e);
          };

          const shouldShowError = (fieldName) => {
            return formSubmitted && errors[fieldName];
          };

          return (
            <form
              className="mt-5 w-full flex flex-col"
              onSubmit={(e) => {
                setFormSubmitted(true);
                handleSubmit(e);
              }}
            >
              <div className="w-full grid grid-cols-5 gap-7">
                <div className="col-span-3">
                  {/* Judul */}
                  <input
                    type="text"
                    name="judul"
                    placeholder="Tulis judul dari review kamu di sini... "
                    className={`text-sm outline-none border bg-white placeholder:text-gray-400 placeholder:italic ${
                      shouldShowError("judul")
                        ? "border-red-700"
                        : "border-gray-400 focus:border-[#E07416]"
                    } py-2.5 px-5 rounded-lg transition-all duration-300 ease-in-out w-full`}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    value={values.judul}
                  />
                  <div className="mb-5 text-sm text-red-700">
                    {shouldShowError("judul") && errors.judul}
                  </div>
                  {/* Detail Review */}
                  <textarea
                    name="detail"
                    placeholder="Tulis detail rasa, suasana, dan pelayanan dari kunjungan kamu disini"
                    className={`text-sm min-h-80 outline-none border bg-white placeholder:text-gray-400 placeholder:italic ${
                      shouldShowError("detail")
                        ? "border-red-700"
                        : "border-gray-400 focus:border-[#E07416]"
                    } py-2.5 px-5 rounded-lg transition-all duration-300 ease-in-out w-full`}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    value={values.detail}
                    spellCheck={false}
                  />
                  <div className="mb-5 text-sm text-red-700">
                    {shouldShowError("detail") && errors.detail}
                  </div>
                  {/* Menu yang dipesan */}
                  <div
                    className={`group w-full flex justify-between bg-white border ${
                      menuInputFocused
                        ? "border-[#E07416]"
                        : `border-gray-400 ${
                            shouldShowError("menu") && "border-red-700"
                          }`
                    } text-sm py-2.5 pl-5 pr-10 rounded-lg transition-all duration-300 ease-in-out`}
                  >
                    <input
                      type="text"
                      name="menu"
                      className="w-4/5 placeholder:text-gray-400 placeholder:italic outline-none"
                      placeholder="Menu yang dipesan"
                      onChange={handleInputChange}
                      onBlur={(e) => {
                        handleBlur(e);
                        setMenuInputFocused(false);
                      }}
                      onFocus={() => setMenuInputFocused(true)}
                      value={values.menu}
                    />
                    <Link
                      href={`/restoran/${params.id}/menu`}
                      className="text-gray-400"
                    >
                      Lihat Menu
                    </Link>
                  </div>
                  {shouldShowError("menu") && (
                    <div className="mb-5 text-sm text-red-700">
                      {errors.menu}
                    </div>
                  )}
                  {/* Upload Foto Review Button */}
                  <div className="mt-10">
                    <button
                      onClick={() => imageInputRef.current.click()}
                      type="button"
                      className="cursor-pointer bg-[#E07416] hover:bg-[#c96711] transition-colors duration-300 text-white text-sm font-medium w-1/4 py-2.5 rounded-md shadow-gray-200 shadow-lg"
                    >
                      Upload Foto
                    </button>
                    <input
                      id="image-upload"
                      ref={imageInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      hidden
                    />
                    {/* New uploaded review images */}
                    <div className="mt-7 space-y-3">
                      {reviewImages.map((reviewImage) => (
                        <div
                          key={reviewImage.id}
                          className="w-full bg-white rounded-md px-3.5 py-3 relative"
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex flex-row space-x-5">
                              <div className="bg-[#FEF7EC] w-7 h-7 p-2">
                                <MdImage className="text-[#E07416]" />
                              </div>
                              <div className="flex flex-col">
                                <p className="font-semibold text-sm">
                                  {reviewImage.name}
                                </p>
                                <p className="mt-1.5 text-gray-600 text-sm">
                                  {reviewImage.uploading
                                    ? "Processing..."
                                    : "Ready to upload"}
                                </p>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => removeReviewImage(reviewImage.id)}
                            className="absolute right-2 top-2 bg-white rounded-full hover:bg-gray-100 transition-colors duration-300 p-1.5 cursor-pointer"
                          >
                            <IoIosClose className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-[#52575E] mb-1">Tanggal Pergi</p>
                  <DatePicker
                    selected={values.tanggalPergi}
                    onChange={(date) => setFieldValue("tanggalPergi", date)}
                    className={`bg-white w-full md:w-80 border ${
                      shouldShowError("tanggalPergi")
                        ? "border-red-700"
                        : "border-gray-400 focus:border-[#E07416]"
                    } outline-none placeholder:text-gray-400 text-sm py-2.5 px-5 rounded-lg transition-all duration-300 ease-in-out`}
                    placeholderText="MM/DD/YYYY"
                  />
                  <div className="mb-5 text-sm text-red-700">
                    {shouldShowError("tanggalPergi") && errors.tanggalPergi}
                  </div>
                  <p className="text-sm text-[#52575E] mb-1">Harga per Orang</p>
                  <div className="relative w-full md:w-80">
                    <select
                      className={`outline-none block cursor-pointer w-full appearance-none rounded-lg border ${
                        shouldShowError("harga")
                          ? "border-red-700"
                          : "border-gray-400 focus:border-[#E07416]"
                      } transition-all duration-300 ease-in-out bg-white px-5 py-2.5 text-sm`}
                      value={values.harga}
                      onChange={(e) => setFieldValue("harga", e.target.value)}
                      name="harga"
                    >
                      <option value="<50000">&lt; Rp50.000</option>
                      <option value="50000-100000">Rp50.000 - Rp100.000</option>
                      <option value="100000-200000">
                        Rp100.000 - Rp200.000
                      </option>
                      <option value="200000-500000">
                        Rp200.000 - Rp500.000
                      </option>
                      <option value=">500000">&gt; Rp500.000</option>
                    </select>
                    <ChevronDownIcon
                      className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-black/60"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mb-5 text-sm text-red-700">
                    {shouldShowError("harga") && errors.harga}
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-[#52575E] mb-1">Rasa Makanan</p>
                      <Rating
                        name="rasa"
                        value={values.rasa}
                        onChange={(_, newValue) => {
                          setFieldValue("rasa", newValue);
                        }}
                      />
                      {shouldShowError("rasa") && (
                        <div className="text-sm text-red-700 mt-1">
                          {errors.rasa}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-[#52575E] mb-1">Suasana</p>
                      <Rating
                        name="suasana"
                        value={values.suasana}
                        onChange={(_, newValue) => {
                          setFieldValue("suasana", newValue);
                        }}
                      />
                      {shouldShowError("suasana") && (
                        <div className="text-sm text-red-700 mt-1">
                          {errors.suasana}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-[#52575E] mb-1">
                        Harga dibandingkan Rasa
                      </p>
                      <Rating
                        name="hargaDibandingkanRasa"
                        value={values.hargaDibandingkanRasa}
                        onChange={(_, newValue) => {
                          setFieldValue("hargaDibandingkanRasa", newValue);
                        }}
                      />
                      {shouldShowError("hargaDibandingkanRasa") && (
                        <div className="text-sm text-red-700 mt-1">
                          {errors.hargaDibandingkanRasa}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-[#52575E] mb-1">Pelayanan</p>
                      <Rating
                        name="pelayanan"
                        value={values.pelayanan}
                        onChange={(_, newValue) => {
                          setFieldValue("pelayanan", newValue);
                        }}
                      />
                      {shouldShowError("pelayanan") && (
                        <div className="text-sm text-red-700 mt-1">
                          {errors.pelayanan}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-[#52575E] mb-1">Kebersihan</p>
                      <Rating
                        name="kebersihan"
                        value={values.kebersihan}
                        onChange={(_, newValue) => {
                          setFieldValue("kebersihan", newValue);
                        }}
                      />
                      {shouldShowError("kebersihan") && (
                        <div className="text-sm text-red-700 mt-1">
                          {errors.kebersihan}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-14 w-full flex justify-end space-x-5">
                <button
                  className="bg-red-600 hover:bg-red-700 text-[#EFEFEF] hover:text-white font-medium py-2.5 rounded-lg cursor-pointer transition-colors w-1/6 shadow-gray-300 shadow-lg"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Mengirim Review..." : "Submit Review"}
                </button>
                <button
                  className="bg-white hover:bg-gray-100 text-[#676363] font-medium py-2.5 rounded-lg cursor-pointer transition-colors w-1/6 shadow-gray-300 shadow-lg"
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default TulisUlasanPage;
