import React from "react";
import FooterComp from "./components/FooterComp";
import { NavbarComp } from "./components/NavbarComp";

const Layout = (props) => {
  return (
    <React.Fragment>
      <NavbarComp />
      {props.children}
      <FooterComp />
    </React.Fragment>
  );
};

export default Layout;
