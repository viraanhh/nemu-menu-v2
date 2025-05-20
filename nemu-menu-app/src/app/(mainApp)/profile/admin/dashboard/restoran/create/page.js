"use client";

import React, { useState } from "react";
import clsx from "clsx";
import { FaImage } from "react-icons/fa6";
import { MdImage } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { Formik } from "formik";
import { Select } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const CreateNewRestaurantPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

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
            <div className="w-full min-h-36 border border-dashed border-gray-600 bg-gray-300/40 rounded-lg cursor-pointer">
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
            </div>
            {/* Upload Menu */}
            <div className="mt-5">
              <p className="font-medium mb-2">Upload Menu</p>
              <div className="w-full min-h-60 border border-dashed border-gray-600 bg-gray-300/40 rounded-lg cursor-pointer">
                <div className="w-full min-h-60 flex items-center justify-center">
                  <div className="flex flex-col">
                    <div className="mx-auto w-10 h-10 bg-white p-3 rounded-sm flex items-center justify-center">
                      <FaImage className="text-[#C26616] h-5 w-5" />
                    </div>
                    <p className="mt-4 text-gray-800 text-sm">
                      Upload Menu Restoran Disini
                    </p>
                  </div>
                </div>
              </div>
              {/* Uploaded Menu Files */}
              <div className="mt-5">
                <p className="text-sm font-medium">File Menu Terupload</p>
                {/* List File Upload */}
                <div className="mt-2.5 space-y-3"></div>
                <div className="w-full bg-white rounded-md px-3.5 py-3 relative">
                  <div className="flex justify-between items-center">
                    <div className="flex flex-row space-x-5">
                      <div className="bg-[#FEF7EC] w-7 h-7 p-2">
                        <MdImage className="text-[#E07416]" />
                      </div>
                      <div className="flex flex-col">
                        <p className="font-semibold text-sm">menu01.png</p>
                        <p className="mt-1.5 text-gray-600 text-sm">
                          Kami sedang memproses file Anda...
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Cancel Button */}
                  <button className="absolute right-2 top-2 bg-white rounded-full hover:bg-gray-100 transition-colors duration-300 p-1.5 cursor-pointer">
                    <IoIosClose className="w-5 h-5" />
                  </button>
                </div>
              </div>
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
              waktuBuka: "09.00",
              waktuTutup: "18.00",
              telepon: "",
              harga: "",
            }}
            validate={(values) => {
              const errors = {};

              if (!values.email)
                errors.email = "Username atau email harus diisi";

              if (!values.password) errors.password = "Password harus diisi";

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setFormSubmitted(true);
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
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
                  <p className="text-[#52575E] text-sm mb-1.5">Alamat Restoran</p>
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
                          placeholder="Hari"
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
                          {shouldShowError("hariBukaAwal") && errors.hariBukaAwal}
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
                          placeholder="Hari"
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
                          {shouldShowError("hariBukaTerakhir") && errors.hariBukaTerakhir}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Waktu Buka */}
                  <p className="text-[#52575E] text-sm mb-1.5">Waktu</p>
                  <div className="w-full flex flex-row space-x-2">
                    {/* Waltu Buka Awal */}
                    <div className="flex flex-row space-x-3.5 h-full justify-center items-center">
                      <p className="text-[#52575E] text-sm -mt-5">Buka:</p>
                      <div className="w-full flex flex-col">
                        <input
                          type="text"
                          name="waktuBuka"
                          placeholder="Jam"
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
                    {/* Buka Akhir */}
                    <div className="flex flex-row space-x-3.5 h-full justify-center items-center">
                      <p className="text-[#52575E] text-sm -mt-5">sampai</p>
                      <div className="w-full flex flex-col">
                        <input
                          type="text"
                          name="waktuTutup"
                          placeholder="Jam"
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
                      className="bg-red-600 hover:bg-red-700 text-[#EFEFEF] hover:text-white font-medium py-2.5 rounded-lg cursor-pointer transition-colors w-1/4 shadow-gray-300 shadow-lg"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Tambah Restoran
                    </button>
                    <button
                      className="bg-white hover:bg-gray-100 text-[#676363] font-medium py-2.5 rounded-lg cursor-pointer transition-colors w-1/4 shadow-gray-300 shadow-lg"
                      type="button"
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
