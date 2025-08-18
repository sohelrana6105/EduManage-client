import React from "react";
import Navbar from "../components/Navbar";

import Footer from "../components/Footer";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <>
      {/* header  */}
      <header className="sticky top-0 z-50">
        <Navbar></Navbar>
      </header>

      {/* Routes pages will show here */}
      <Outlet></Outlet>

      {/* Footer */}
      <Footer></Footer>
    </>
  );
};

export default RootLayout;
