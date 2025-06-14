"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { FaImage } from "react-icons/fa6";
import { MdImage } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { Formik } from "formik";
import { Select } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import toast from "react-hot-toast";

import { supabase } from "@/utils/supabase";

const CreateNewRestaurantPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [restaurantImage, setRestaurantImage] = useState(null);
  const [restaurantImagePreview, setRestaurantImagePreview] = useState(null);
  const [menuImages, setMenuImages] = useState([]);

  const router = useRouter();

  const handleImageUpload = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      if (type === "restaurant") {
        setRestaurantImage(file);
        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setRestaurantImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else if (type === "menu") {
        const newMenu = {
          id: Date.now(),
          file: file,
          name: file.name,
          uploading: false,
          preview: URL.createObjectURL(file),
        };
        setMenuImages((prev) => [...prev, newMenu]);
      }
    }
  };

  const handleUploadRestaurantImage = async (restaurantId) => {
    if (!restaurantImage) return null;

    try {
      const bucketName = "nemu-menu";
      const imageFullPath = `/restaurant/${restaurantId}/restaurant_image.png`;

      const { data, error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(imageFullPath, restaurantImage, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) throw uploadError;

      const { data: imageUrl } = supabase.storage
        .from(bucketName)
        .getPublicUrl(imageFullPath);

      if (imageUrl?.publicUrl) {
        return imageUrl.publicUrl;
      }

      return null;
    } catch (error) {
      console.error("Error uploading restaurant image:", error);
      throw error;
    }
  };

  const handleUploadMenuImages = async (restaurantId) => {
    const uploadedUrls = {};

    try {
      const bucketName = "nemu-menu";

      for (let i = 0; i < menuImages.length && i < 5; i++) {
        const menu = menuImages[i];
        const menuIndex = i + 1;
        const imageFullPath = `/restaurant/${restaurantId}/menu_${menuIndex}.png`;

        const { data, error: uploadError } = await supabase.storage
          .from(bucketName)
          .upload(imageFullPath, menu.file, {
            cacheControl: "3600",
            upsert: true,
          });

        if (uploadError) throw uploadError;

        const { data: imageUrl } = supabase.storage
          .from(bucketName)
          .getPublicUrl(imageFullPath);

        if (imageUrl?.publicUrl) {
          uploadedUrls[`menu_${menuIndex}_new`] = imageUrl.publicUrl;
        }
      }

      return uploadedUrls;
    } catch (error) {
      console.error("Error uploading menu images:", error);
      throw error;
    }
  };

  const removeMenuImage = (id) => {
    setMenuImages((prev) => prev.filter((menu) => menu.id !== id));
  };

  const handleCancel = () => {
    router.push("/profile/admin/dashboard");
  };

  return (
    <div className="w-full min-h-screen py-20 px-32">
      <div className="w-full grid grid-cols-5 gap-10">
        {/* Upload Foto dan Menu Container */}
        <div className="full col-span-2">
          <h1 className="text-2xl text-[#E07416] font-bold">
            Tambah Restoran Baru
          </h1>
          <div className="mt-7">
            {/* Upload Foto */}
            <p className="font-medium mb-2">Upload Foto</p>
            <div className="w-full min-h-36 border border-dashed border-gray-600 bg-gray-300/40 rounded-lg cursor-pointer relative overflow-hidden">
              {restaurantImagePreview ? (
                <div className="relative w-full h-36">
                  <img
                    src={restaurantImagePreview}
                    alt="Restaurant Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm">Click to change image</p>
                  </div>
                </div>
              ) : (
                <div className="w-full min-h-36 flex items-center justify-center">
                  <div className="flex flex-col">
                    <div className="mx-auto w-10 h-10 bg-white p-3 rounded-sm flex items-center justify-center">
                      <FaImage className="text-[#C26616] h-5 w-5" />
                    </div>
                    <p className="mt-4 text-gray-800 text-sm">
                      Upload Foto Restoran Disini
                    </p>
                  </div>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, "restaurant")}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>

            {/* Upload Menu */}
            <div className="mt-5">
              <p className="font-medium mb-2">Upload Menu</p>
              <div className="w-full min-h-60 border border-dashed border-gray-600 bg-gray-300/40 rounded-lg cursor-pointer relative">
                <div className="w-full min-h-60 flex items-center justify-center">
                  <div className="flex flex-col">
                    <div className="mx-auto w-10 h-10 bg-white p-3 rounded-sm flex items-center justify-center">
                      <FaImage className="text-[#C26616] h-5 w-5" />
                    </div>
                    <p className="mt-4 text-gray-800 text-sm">
                      Upload Menu Restoran Disini
                    </p>
                    <p className="mt-2 text-gray-600 text-xs text-center">
                      Maksimal 5 gambar menu
                    </p>
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleImageUpload(e, "menu")}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>

              {/* Uploaded Menu Files */}
              {menuImages.length > 0 && (
                <div className="mt-5">
                  <p className="text-sm font-medium">File Menu Terupload</p>
                  <div className="mt-2.5 space-y-3">
                    {menuImages.map((menu) => (
                      <div
                        key={menu.id}
                        className="w-full bg-white rounded-md px-3.5 py-3 relative"
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex flex-row space-x-5">
                            <div className="bg-[#FEF7EC] w-7 h-7 p-2">
                              <MdImage className="text-[#E07416]" />
                            </div>
                            <div className="flex flex-col">
                              <p className="font-semibold text-sm">
                                {menu.name}
                              </p>
                              <p className="mt-1.5 text-gray-600 text-sm">
                                Siap untuk diupload
                              </p>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => removeMenuImage(menu.id)}
                          className="absolute right-2 top-2 bg-white rounded-full hover:bg-gray-100 transition-colors duration-300 p-1.5 cursor-pointer"
                        >
                          <IoIosClose className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="full col-span-3">
          <h2 className="font-bold text-xl">Dashboard Admin</h2>
          {/* Form */}
          <Formik
            initialValues={{
              namaRestoran: "",
              alamat: "",
              hariBukaAwal: "",
              hariBukaTerakhir: "",
              waktuBuka: "09:00",
              waktuTutup: "18:00",
              telepon: "",
              harga: "",
            }}
            validate={(values) => {
              const errors = {};

              if (!values.namaRestoran) {
                errors.namaRestoran = "Nama restoran harus diisi";
              }
              if (!values.alamat) {
                errors.alamat = "Alamat harus diisi";
              }
              if (!values.hariBukaAwal) {
                errors.hariBukaAwal = "Hari buka awal harus diisi";
              }
              if (!values.hariBukaTerakhir) {
                errors.hariBukaTerakhir = "Hari buka terakhir harus diisi";
              }
              if (!values.waktuBuka) {
                errors.waktuBuka = "Waktu buka harus diisi";
              }
              if (!values.waktuTutup) {
                errors.waktuTutup = "Waktu tutup harus diisi";
              }
              if (!values.telepon) {
                errors.telepon = "Nomor telepon harus diisi";
              }
              if (!values.harga) {
                errors.harga = "Range harga harus dipilih";
              }

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
                const loadingToast = toast.loading("Creating restaurant...");

                // First, create the restaurant without images
                const restaurantData = {
                  nama: values.namaRestoran,
                  alamat: values.alamat,
                  hari_buka_awal: values.hariBukaAwal,
                  hari_buka_akhir: values.hariBukaTerakhir,
                  jam_buka: values.waktuBuka,
                  jam_tutup: values.waktuTutup,
                  nomor_telepon: values.telepon,
                  range_harga: values.harga,
                };

                console.log("creating restaurant...");
                const response = await fetch(
                  `${process.env.NEXT_PUBLIC_API_URL}/api/restaurants`,
                  {
                    method: "POST",
                    headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(restaurantData),
                  }
                );

                if (!response.ok) {
                  const errorData = await response.json();
                  throw new Error(
                    errorData.message ||
                      `HTTP error! status: ${response.status}`
                  );
                }

                const data = await response.json();
                const restaurantId = data.restaurant.id;

                // Upload images if they exist
                let updateData = {};

                console.log("creating image upload...");
                console.log("For restaurant image...");
                if (restaurantImage) {
                  const restaurantImageUrl = await handleUploadRestaurantImage(
                    restaurantId
                  );
                  if (restaurantImageUrl) {
                    updateData.restaurant_image_new = restaurantImageUrl;
                  }
                }

                console.log("For menus image...");
                if (menuImages.length > 0) {
                  const menuImageUrls = await handleUploadMenuImages(
                    restaurantId
                  );
                  Object.assign(updateData, menuImageUrls);
                }

                // Update restaurant with image URLs if any images were uploaded
                if (Object.keys(updateData).length > 0) {
                  const updateResponse = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/restaurants/${restaurantId}`,
                    {
                      method: "PATCH",
                      headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(updateData),
                    }
                  );

                  if (!updateResponse.ok) {
                    console.warn(
                      "Failed to update restaurant with images, but restaurant was created"
                    );
                  }
                }

                // Dismiss loading toast and show success
                toast.dismiss(loadingToast);
                toast.success("Restaurant created successfully!");

                // Redirect to dashboard
                router.push("/profile/admin/dashboard");
              } catch (error) {
                console.error("Error creating restaurant:", error);

                toast.error("Failed to create restaurant. Please try again.");

                if (
                  error.message.includes("401") ||
                  error.message.includes("Unauthorized")
                ) {
                  router.push("/login");
                } else if (
                  error.message.includes("403") ||
                  error.message.includes("Forbidden")
                ) {
                  toast.error(
                    "You don't have permission to create restaurants."
                  );
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
                  {/* Nama Restoran */}
                  <p className="text-[#52575E] text-sm mb-1.5">Nama Restoran</p>
                  <input
                    type="text"
                    name="namaRestoran"
                    placeholder="Nama Restoran"
                    className={`text-sm outline-none border bg-white placeholder:text-gray-400 ${
                      shouldShowError("namaRestoran")
                        ? "border-red-700"
                        : "border-gray-400 focus:border-[#E07416]"
                    } py-2.5 px-5 rounded-lg transition-all duration-300 ease-in-out w-full`}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    value={values.namaRestoran}
                  />
                  <div className="mb-5 text-sm text-red-700">
                    {shouldShowError("namaRestoran") && errors.namaRestoran}
                  </div>

                  {/* Alamat Restoran */}
                  <p className="text-[#52575E] text-sm mb-1.5">
                    Alamat Restoran
                  </p>
                  <input
                    type="text"
                    name="alamat"
                    placeholder="Alamat Restoran"
                    className={`text-sm outline-none border bg-white placeholder:text-gray-400 ${
                      shouldShowError("alamat")
                        ? "border-red-700"
                        : "border-gray-400 focus:border-[#E07416]"
                    } py-2.5 px-5 rounded-lg transition-all duration-300 ease-in-out w-full`}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    value={values.alamat}
                  />
                  <div className="mb-5 text-sm text-red-700">
                    {shouldShowError("alamat") && errors.alamat}
                  </div>

                  {/* Hari Buka */}
                  <p className="text-[#52575E] text-sm mb-1.5">Hari</p>
                  <div className="w-full flex flex-row space-x-2">
                    {/* Buka Awal */}
                    <div className="flex flex-row space-x-3.5 h-full justify-center items-center">
                      <p className="text-[#52575E] text-sm -mt-5">Buka:</p>
                      <div className="w-full flex flex-col">
                        <input
                          type="text"
                          name="hariBukaAwal"
                          placeholder="Senin"
                          className={`text-sm outline-none border bg-white placeholder:text-gray-400 ${
                            shouldShowError("hariBukaAwal")
                              ? "border-red-700"
                              : "border-gray-400 focus:border-[#E07416]"
                          } py-2.5 px-5 rounded-lg transition-all duration-300 ease-in-out w-full`}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          value={values.hariBukaAwal}
                        />
                        <div className="mb-5 text-sm text-red-700">
                          {shouldShowError("hariBukaAwal") &&
                            errors.hariBukaAwal}
                        </div>
                      </div>
                    </div>
                    {/* Buka Akhir */}
                    <div className="flex flex-row space-x-3.5 h-full justify-center items-center">
                      <p className="text-[#52575E] text-sm -mt-5">sampai</p>
                      <div className="w-full flex flex-col">
                        <input
                          type="text"
                          name="hariBukaTerakhir"
                          placeholder="Minggu"
                          className={`text-sm outline-none border bg-white placeholder:text-gray-400 ${
                            shouldShowError("hariBukaTerakhir")
                              ? "border-red-700"
                              : "border-gray-400 focus:border-[#E07416]"
                          } py-2.5 px-5 rounded-lg transition-all duration-300 ease-in-out w-full`}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          value={values.hariBukaTerakhir}
                        />
                        <div className="mb-5 text-sm text-red-700">
                          {shouldShowError("hariBukaTerakhir") &&
                            errors.hariBukaTerakhir}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Waktu Buka */}
                  <p className="text-[#52575E] text-sm mb-1.5">Waktu</p>
                  <div className="w-full flex flex-row space-x-2">
                    {/* Waktu Buka Awal */}
                    <div className="flex flex-row space-x-3.5 h-full justify-center items-center">
                      <p className="text-[#52575E] text-sm -mt-5">Buka:</p>
                      <div className="w-full flex flex-col">
                        <input
                          type="time"
                          name="waktuBuka"
                          className={`text-sm outline-none border bg-white placeholder:text-gray-400 ${
                            shouldShowError("waktuBuka")
                              ? "border-red-700"
                              : "border-gray-400 focus:border-[#E07416]"
                          } py-2.5 px-5 rounded-lg transition-all duration-300 ease-in-out w-full`}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          value={values.waktuBuka}
                        />
                        <div className="mb-5 text-sm text-red-700">
                          {shouldShowError("waktuBuka") && errors.waktuBuka}
                        </div>
                      </div>
                    </div>
                    {/* Waktu Tutup */}
                    <div className="flex flex-row space-x-3.5 h-full justify-center items-center">
                      <p className="text-[#52575E] text-sm -mt-5">sampai</p>
                      <div className="w-full flex flex-col">
                        <input
                          type="time"
                          name="waktuTutup"
                          className={`text-sm outline-none border bg-white placeholder:text-gray-400 ${
                            shouldShowError("waktuTutup")
                              ? "border-red-700"
                              : "border-gray-400 focus:border-[#E07416]"
                          } py-2.5 px-5 rounded-lg transition-all duration-300 ease-in-out w-full`}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          value={values.waktuTutup}
                        />
                        <div className="mb-5 text-sm text-red-700">
                          {shouldShowError("waktuTutup") && errors.waktuTutup}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Nomor Telepon */}
                  <p className="text-[#52575E] text-sm mb-1.5">Nomor Telepon</p>
                  <input
                    type="tel"
                    name="telepon"
                    placeholder="Nomor Telepon"
                    className={`text-sm outline-none border bg-white placeholder:text-gray-400 ${
                      shouldShowError("telepon")
                        ? "border-red-700"
                        : "border-gray-400 focus:border-[#E07416]"
                    } py-2.5 px-5 rounded-lg transition-all duration-300 ease-in-out w-full`}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    value={values.telepon}
                  />
                  <div className="mb-5 text-sm text-red-700">
                    {shouldShowError("telepon") && errors.telepon}
                  </div>

                  {/* Range Harga */}
                  <p className="text-[#52575E] text-sm mb-1.5">Range Harga</p>
                  <div className="relative w-full">
                    <Select
                      className={({ open }) =>
                        clsx(
                          `outline-none block cursor-pointer w-full appearance-none rounded-lg border ${
                            open ? "border-[#E07416]" : "border-gray-400"
                          } transition-all duration-300 ease-in-out bg-white px-5 py-2.5 text-sm`,
                          "focus:outline-none focus:border-[#E07416] focus-visible:border-[#E07416]",
                          "focus-within:border-[#E07416]",
                          "*:text-black"
                        )
                      }
                      value={values.harga}
                      onChange={(e) => setFieldValue("harga", e.target.value)}
                      name="harga"
                    >
                      <option value="">Pilih Range Harga</option>
                      <option value="<50000">&lt; Rp50.000</option>
                      <option value="50000-100000">Rp50.000 - Rp100.000</option>
                      <option value="100000-200000">
                        Rp100.000 - Rp200.000
                      </option>
                      <option value="200000-500000">
                        Rp200.000 - Rp500.000
                      </option>
                      <option value=">500000">&gt; Rp500.000</option>
                    </Select>
                    <ChevronDownIcon
                      className="group pointer-events-none absolute top-3 right-2.5 size-4 fill-black/60"
                      aria-hidden="true"
                    />
                    <div className="mb-5 text-sm text-red-700">
                      {shouldShowError("harga") && errors.harga}
                    </div>
                  </div>

                  {/* Button Tambah Restoran dan Cancel */}
                  <div className="mt-10 w-full flex justify-end space-x-5">
                    <button
                      className="bg-[#E07416] hover:bg-[#c96711] text-[#EFEFEF] hover:text-white font-medium py-2.5 rounded-lg cursor-pointer transition-colors w-1/4 shadow-gray-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Menyimpan..." : "Tambah Restoran"}
                    </button>
                    <button
                      className="bg-white hover:bg-gray-100 text-[#676363] font-medium py-2.5 rounded-lg cursor-pointer transition-colors w-1/4 shadow-gray-300 shadow-lg"
                      type="button"
                      onClick={handleCancel}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CreateNewRestaurantPage;
