import React from "react";
import { Toaster } from "react-hot-toast";

import { UserProvider } from "@/contexts/UserContext";
import Header from "@/components/header";
import Footer from "@/components/footer";

const AppLayout = ({ children }) => {
  return (
    <UserProvider>
      <div>
        <Toaster />
        <Header />
        <div className="min-w-full min-h-screen bg-[#efefef]">{children}</div>
        <Footer />
      </div>
    </UserProvider>
  );
};

export default AppLayout;
