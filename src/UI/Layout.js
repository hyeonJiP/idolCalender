import React from "react";
import Footer from "./Footer";
import Headar from "./Header";

const Layout = (props) => {
  return (
    <>
      <Headar />
      <>{props.children}</>
      <Footer />
    </>
  );
};

export default Layout;
