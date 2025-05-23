"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import { Formik } from "formik";
import Link from "next/link";

import { useUser } from "@/contexts/UserContext";

const LoginPage = () => {
  const router = useRouter();
  const { login, user, fetchUser } = useUser();

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
              Masuk ke Akunmu
            </h2>
            <Formik
              initialValues={{ email: "", password: "" }}
              validate={(values) => {
                const errors = {};

                if (!values.email)
                  errors.email = "Username atau email harus diisi";

                if (!values.password) errors.password = "Password harus diisi";

                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                setFormSubmitted(true);
                setError("");

                try {
                  const result = await login(values);

                  if (!result.success) throw Error(result.error);
                } catch (error) {
                  console.log("Error trying to log in:", error);
                  setError("Something went wrong logging in, please try again");
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
                      name="email"
                      placeholder="Email atau Username"
                      className={`text-sm outline-none border ${
                        shouldShowError("email")
                          ? "border-red-700"
                          : "border-gray-300 focus:border-[#E07416]"
                      } py-2.5 px-5 rounded-lg transition-all duration-300 ease-in-out`}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      value={values.email}
                      spellCheck={false}
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
                    <button
                      className="bg-red-600 hover:bg-red-700 text-[#EFEFEF] hover:text-white font-medium py-2 rounded-lg cursor-pointer transition-colors"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Logging In..." : "Login"}
                    </button>
                    <div className="mt-7 text-sm text-center">
                      <p className="text-gray-400">Belum punya akun?</p>
                      <Link
                        href="/signup"
                        className="text-[#C26616] hover:font-semibold transition-all duration-300 ease-in-out"
                      >
                        Ayo daftar sekarang
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

export default LoginPage;
