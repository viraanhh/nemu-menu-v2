"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import { Formik } from "formik";
import Link from "next/link";

import { useUser } from "@/contexts/UserContext";

const SignupPage = () => {
  const router = useRouter();
  const { signup, user } = useUser();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user, router]);

  useEffect(() => {
    if (!!error) toast.error(error);
  }, [error]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="bg-white px-10 py-12 w-[27.6rem]">
        <div className="">
          <div>
            <div className="w-full flex justify-center">
              <Image
                src="/assets/images/nemumenu-orange-logo.png"
                alt="NemuMenu Logo"
                width={200}
                height={66}
              />
            </div>
            <h2 className="mt-9 text-lg text-center font-bold">
              Buat Akun Baru
            </h2>
            <Formik
              initialValues={{
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validate={(values) => {
                const errors = {};

                if (!values.email) {
                  errors.email = "Email harus diisi";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Alamat email tidak valid";
                }

                if (!values.username) errors.username = "Username harus diisi";

                if (!values.password) errors.password = "Password harus diisi";
                if (values.password !== values.confirmPassword)
                  errors.confirmPassword = "Password tidak cocok";

                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                setFormSubmitted(true);
                setError("");

                try {
                  const signUpData = {
                    email: values.email,
                    is_admin: false,
                    username: values.username,
                    password: values.password,
                  };
                  const result = await signup(signUpData);

                  if (!result.success) throw Error(result.error);

                  toast.success("Sign up successful! Please log in again");
                  router.replace("/login");
                } catch (error) {
                  console.log("Error when trying to sign up: ", error.message);
                  setError(error.message);
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
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      className={`text-sm outline-none border ${
                        shouldShowError("username")
                          ? "border-red-700"
                          : "border-gray-300 focus:border-[#E07416] "
                      } py-2.5 px-5 rounded-lg transition-all duration-300 ease-in-out`}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      value={values.username}
                    />
                    <div className="mb-5 text-sm text-red-700">
                      {shouldShowError("username") && errors.username}
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className={`text-sm outline-none border ${
                        shouldShowError("email")
                          ? "border-red-700"
                          : "border-gray-300 focus:border-[#E07416] "
                      } py-2.5 px-5 rounded-lg transition-all duration-300 ease-in-out`}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    <div className="mb-5 text-sm text-red-700">
                      {shouldShowError("email") && errors.email}
                    </div>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className={`text-sm outline-none border ${
                        shouldShowError("password")
                          ? "border-red-700"
                          : "border-gray-300 focus:border-[#E07416] "
                      } py-2.5 px-5 rounded-lg transition-all duration-300 ease-in-out`}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    <div className="mb-5 text-sm text-red-700">
                      {shouldShowError("password") && errors.password}
                    </div>
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Konfirmasi Password"
                      className={`text-sm outline-none border ${
                        shouldShowError("confirmPassword")
                          ? "border-red-700"
                          : "border-gray-300 focus:border-[#E07416] "
                      } py-2.5 px-5 rounded-lg transition-all duration-300 ease-in-out`}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      value={values.confirmPassword}
                    />
                    <div className="mb-5 text-sm text-red-700">
                      {shouldShowError("confirmPassword") &&
                        errors.confirmPassword}
                    </div>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-[#EFEFEF] hover:text-white font-medium py-2 rounded-lg cursor-pointer transition-colors"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Signing Up..." : "Sign Up"}
                    </button>
                    <div className="mt-7 text-sm text-center">
                      <p className="text-gray-400">Sudah punya akun?</p>
                      <Link
                        href="/login"
                        className="text-[#C26616] hover:font-semibold transition-all duration-300 ease-in-out"
                      >
                        Login disini
                      </Link>
                    </div>
                  </form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
