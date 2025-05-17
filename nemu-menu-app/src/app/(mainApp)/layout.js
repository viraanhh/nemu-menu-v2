import React from "react";

import Header from "@/components/header";
import Footer from "@/components/footer";

const AppLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="min-w-full min-h-screen bg-[#efefef]">{children}</div>
      <Footer />
    </div>
  );
};

export default AppLayout;
