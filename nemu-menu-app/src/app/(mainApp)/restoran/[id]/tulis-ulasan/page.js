"use client";

import React, { useState } from "react";
import { Formik } from "formik";
import { Select } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import Rating from "@mui/material/Rating";
import DatePicker from "react-datepicker";
import clsx from "clsx";

import "react-datepicker/dist/react-datepicker.css";

const TulisUlasanPage = ({ params }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [menuInputFocused, setMenuInputFocused] = useState(false);

  return (
    <div className="w-full min-h-screen py-20 px-32">
      <h1 className="text-4xl font-bold text-[#E07416]">Nabila Steak</h1>
      <Formik
        initialValues={{
          judul: "",
          detail: "",
          menu: "",
          tanggalPergi: new Date(),
          harga: "",
          rasa: 0,
          suasana: 0,
          hargaDibandingkanRasa: 0,
          pelayanan: 0,
          kebersihan: 0,
        }}
        validate={(values) => {
          const errors = {};

          if (!values.email) errors.email = "Username atau email harus diisi";

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
              <div className="w-full grid grid-cols-5 space-x-5">
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
                  {/* Upload Foto Review Button */}
                  <div className="mt-10">
                    <button
                      type="button"
                      className="cursor-pointer bg-[#E07416] hover:bg-[#c96711] transition-colors duration-300 text-white text-sm font-medium w-1/4 py-2.5 rounded-md shadow-gray-200 shadow-lg"
                    >
                      Upload Foto
                    </button>
                  </div>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-[#52575E] mb-1">Tanggal Pergi</p>
                  <DatePicker
                    selected={values.tanggalPergi}
                    onChange={(date) => setFieldValue("tanggalPergi", date)}
                    className="bg-white w-full md:w-80 border border-gray-400 outline-none placeholder:text-gray-400 focus:border-[#E07416] text-sm py-2.5 px-5 rounded-lg transition-all duration-300 ease-in-out"
                    placeholderText="MM/DD/YYYY"
                  />
                  <div className="mb-5 text-sm text-red-700">
                    {shouldShowError("tanggaPergi") && errors.tanggaPergi}
                  </div>
                  <p className="text-sm text-[#52575E] mb-1">Harga per Orang</p>
                  <div className="relative w-full md:w-80">
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
                      className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-black/60"
                      aria-hidden="true"
                    />
                    <div className="mb-5 text-sm text-red-700">
                      {shouldShowError("password") && errors.password}
                    </div>
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
                  Submit Review
                </button>
                <button
                  className="bg-white hover:bg-gray-100 text-[#676363] font-medium py-2.5 rounded-lg cursor-pointer transition-colors w-1/6 shadow-gray-300 shadow-lg"
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
  );
};

export default TulisUlasanPage;
