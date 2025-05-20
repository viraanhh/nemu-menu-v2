"use client";

import React, { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { Formik } from "formik";
import { Select } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const ProfilePage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <div className="w-full min-h-screen py-20 px-32">
      <h1 className="text-2xl text-[#E07416] font-bold">Edit Profil User</h1>
      <div className="w-full grid grid-cols-5 gap-10">
        {/* Form */}
        <div className="w-full col-span-3">
          {/* User Profile */}
          <div className="mt-6 flex flex-row items-center space-x-10">
            <Image
              src="/assets/images/default-user-profile.png"
              width={1920}
              height={1080}
              className="w-full h-full rounded-full object-cover max-h-32 max-w-32"
              alt="Profile Image"
            />
            <button
              type="button"
              className="cursor-pointer bg-[#E07416] hover:bg-[#c96711] transition-colors duration-300 text-white text-sm font-medium w-1/4 py-2.5 rounded-md shadow-lg shadow-gray-300"
            >
              Upload Foto
            </button>
          </div>
          {/* Form */}
          <Formik
            initialValues={{
              email: "",
              phone: "",
              firstName: "",
              lastName: "",
              date: "1",
              month: "1",
              year: "2025",
              gender: "",
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
                  {/* Email */}
                  <p className="text-[#52575E] text-sm mb-1.5">Email</p>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className={`text-sm outline-none border bg-white placeholder:text-gray-400 ${
                      shouldShowError("email")
                        ? "border-red-700"
                        : "border-gray-400 focus:border-[#E07416]"
                    } py-2.5 px-5 rounded-lg transition-all duration-300 ease-in-out w-full`}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <div className="mb-5 text-sm text-red-700">
                    {shouldShowError("email") && errors.email}
                  </div>
                  {/* No Telepon */}
                  <p className="text-[#52575E] text-sm mb-1.5">No. Telepon</p>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Nomor Telepon"
                    className={`text-sm outline-none border bg-white placeholder:text-gray-400 ${
                      shouldShowError("phone")
                        ? "border-red-700"
                        : "border-gray-400 focus:border-[#E07416]"
                    } py-2.5 px-5 rounded-lg transition-all duration-300 ease-in-out w-full`}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    value={values.phone}
                  />
                  <div className="mb-5 text-sm text-red-700">
                    {shouldShowError("phone") && errors.phone}
                  </div>
                  {/* Nama Depan dan Belakang */}
                  <p className="text-[#52575E] text-sm mb-1.5">Nama</p>
                  <div className="w-full flex flex-row space-x-2">
                    {/* Nama Depan */}
                    <div className="w-full flex flex-col">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="Nama Depan"
                        className={`text-sm outline-none border bg-white placeholder:text-gray-400 ${
                          shouldShowError("firstName")
                            ? "border-red-700"
                            : "border-gray-400 focus:border-[#E07416]"
                        } py-2.5 px-5 rounded-lg transition-all duration-300 ease-in-out w-full`}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        value={values.firstName}
                      />
                      <div className="mb-5 text-sm text-red-700">
                        {shouldShowError("firstName") && errors.firstName}
                      </div>
                    </div>
                    {/* Nama Belakang */}
                    <div className="w-full flex flex-col">
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Nama Belakang"
                        className={`text-sm outline-none border bg-white placeholder:text-gray-400 ${
                          shouldShowError("lastName")
                            ? "border-red-700"
                            : "border-gray-400 focus:border-[#E07416]"
                        } py-2.5 px-5 rounded-lg transition-all duration-300 ease-in-out w-full`}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        value={values.lastName}
                      />
                      <div className="mb-5 text-sm text-red-700">
                        {shouldShowError("lastName") && errors.lastName}
                      </div>
                    </div>
                  </div>
                  {/* Tanggal Lahir (Tanggal, Bulan, Tahun) */}
                  <p className="text-[#52575E] text-sm mb-1.5">Tanggal Lahir</p>
                  <div className="w-full flex flex-row space-x-2">
                    {/* Tanggal */}
                    <div className="w-full flex flex-col">
                      <input
                        type="text"
                        name="date"
                        placeholder="Tanggal"
                        className={`text-sm outline-none border bg-white placeholder:text-gray-400 ${
                          shouldShowError("date")
                            ? "border-red-700"
                            : "border-gray-400 focus:border-[#E07416]"
                        } py-2.5 px-5 rounded-lg transition-all duration-300 ease-in-out w-full`}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        value={values.date}
                      />
                      <div className="mb-5 text-sm text-red-700">
                        {shouldShowError("date") && errors.date}
                      </div>
                    </div>
                    {/* Bulan */}
                    <div className="w-full flex flex-col">
                      <input
                        type="text"
                        name="month"
                        placeholder="Bulan"
                        className={`text-sm outline-none border bg-white placeholder:text-gray-400 ${
                          shouldShowError("month")
                            ? "border-red-700"
                            : "border-gray-400 focus:border-[#E07416]"
                        } py-2.5 px-5 rounded-lg transition-all duration-300 ease-in-out w-full`}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        value={values.month}
                      />
                      <div className="mb-5 text-sm text-red-700">
                        {shouldShowError("month") && errors.month}
                      </div>
                    </div>
                    {/* Bulan */}
                    <div className="w-full flex flex-col">
                      <input
                        type="text"
                        name="year"
                        placeholder="Tahun"
                        className={`text-sm outline-none border bg-white placeholder:text-gray-400 ${
                          shouldShowError("year")
                            ? "border-red-700"
                            : "border-gray-400 focus:border-[#E07416]"
                        } py-2.5 px-5 rounded-lg transition-all duration-300 ease-in-out w-full`}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        value={values.year}
                      />
                      <div className="mb-5 text-sm text-red-700">
                        {shouldShowError("year") && errors.year}
                      </div>
                    </div>
                  </div>
                  {/* Jenis Kelamin */}
                  <p className="text-[#52575E] text-sm mb-1.5">Jenis Kelamin</p>
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
                      value={values.gender}
                      onChange={(e) => setFieldValue("gender", e.target.value)}
                      name="gender"
                    >
                      <option value="laki-laki">Laki-Laki</option>
                      <option value="perempuan">Perempuan</option>
                    </Select>
                    <ChevronDownIcon
                      className="group pointer-events-none absolute top-3 right-2.5 size-4 fill-black/60"
                      aria-hidden="true"
                    />
                    <div className="mb-5 text-sm text-red-700">
                      {shouldShowError("gender") && errors.gender}
                    </div>
                  </div>
                  {/* Button Update Profil dan Cancel */}
                  <div className="mt-5 w-full flex flex-row space-x-5">
                    <button
                      className="bg-red-600 hover:bg-red-700 text-[#EFEFEF] hover:text-white font-medium py-2.5 rounded-lg cursor-pointer transition-colors w-1/4 shadow-gray-300 shadow-lg"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Update Profil
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
        {/* Pengaturan Akun */}
        <div className="w-full col-span-2">
            <h3 className="text-lg text-[#52575E] font-bold">Pengaturan Akun</h3>
            <button className="mt-3 text-sm text-[#52575E] hover:text-gray-800 hover:font-medium w-full md:w-80 border border-gray-500 hover:border-gray-800 bg-white hover:bg-gray-100 rounded-lg cursor-pointer transition-colors duration-300 text-start py-2.5 px-5">Manajemen Restoran</button>
            <button className="mt-3 text-sm text-red-700 font-medium w-full md:w-80 border border-red-700 bg-white hover:bg-red-700 hover:text-white rounded-lg cursor-pointer transition-colors duration-300 text-start py-2.5 px-5">Log Out</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
