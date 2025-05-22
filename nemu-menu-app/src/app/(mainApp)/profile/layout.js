"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useUser } from "@/contexts/UserContext";

const ProfileLayout = ({ children }) => {
  const { user, loading } = useUser();

  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.replace("/");
    }
  }, [user, router, loading]);

  return <div>{children}</div>;
};

export default ProfileLayout;
