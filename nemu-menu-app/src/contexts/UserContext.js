"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetchUser(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async (token) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user:", error);
    }

    setLoading(false);
  };

  const updateUser = async (userData) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();
      console.log("Response from update:", data);

      if (data.user) {
        setUser(data.user);
      }

      return {
        success: true,
        user: data.user,
      };
    } catch (error) {
      console.error("Error updating user:", error);
      return {
        success: false,
        error: "An error occurred while updating user information",
      };
    }
  };

  const login = async (loginData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            login: loginData.email,
            password: loginData.password,
          }),
        }
      );

      const data = await response.json();

      if (data.message === "Invalid credentials")
        throw Error("Invalid credentials");

      localStorage.setItem("token", data.access_token);
      setUser(data.user);
      router.push("/");

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: "An error occurred during login",
      };
    }
  };

  const signup = async (signupData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signupData),
        }
      );

      const data = await response.json();

      if (data.errors) {
        const errors = [];

        if (data.errors.email && data.errors.email.length > 0)
          errors.push(data.errors.email[0]);
        if (data.errors.password && data.errors.password.length > 0)
          errors.push(data.errors.password[0]);

        const errorMessage = errors.join(" and ");

        throw Error(errorMessage);
      }

      return { success: true };
    } catch (error) {
      let errorMessage;
      if (typeof error.message === "string") {
        errorMessage = error.message;
      } else {
        errorMessage = "Something went wrong when trying to sign up.";
      }

      return {
        success: false,
        error: errorMessage,
      };
    }
  };

  const getUserProfileUrl = (userId) => {
    return `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/profile-image`;
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }

    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        updateUser,
        fetchUser,
        getUserProfileUrl,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
