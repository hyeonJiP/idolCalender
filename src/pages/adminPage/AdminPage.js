import React from "react";
import { getCookie } from "../../cookie/cookie";
import Headar from "../../UI/Header";
import SideBar from "./SideBar";

const AdminPage = () => {
  console.log(getCookie("isLogin"));

  return (
    <>
      <Headar />
      <SideBar />
      {/* <ReportTabe /> */}
    </>
  );
};

export default AdminPage;
