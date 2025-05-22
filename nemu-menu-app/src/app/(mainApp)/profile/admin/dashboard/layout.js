"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useUser } from "@/contexts/UserContext";

const AdminDashboardLayout = ({ children }) => {
  const { user, loading } = useUser();

  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user.is_admin) router.replace("/profile");
    }
  }, [user, router, loading]);

  return <div>{children}</div>;
};

export default AdminDashboardLayout;
