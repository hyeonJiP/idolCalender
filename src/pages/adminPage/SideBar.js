import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import { getCookie } from "../../cookie/cookie";
import AdminPageHome from "./AdminPageHome";
import ReportTable from "./ReportTable";
import styles from "./SideBar.module.scss";
import UserTable from "./UserTable";

const SideBar = () => {
  const adminName = getCookie("isLogin").nickname;

  return (
    <>
      <div className={styles.adminContents}>
        <div className={styles.sideBar}>
          <div className={styles.sideBarUser}>
            <img alt="" />
            <div className={styles.sideBarTitle}>🤴{adminName}</div>
          </div>
          <nav className={styles.sideBarNav}>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${styles.navAble}` : `${styles.navDisable}`
              }
              to="/admin/main"
            >
              Main
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${styles.navAble}` : `${styles.navDisable}`
              }
              to="/admin/userlist"
            >
              UserList
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${styles.navAble}` : `${styles.navDisable}`
              }
              to="/admin/reports"
            >
              ReportTable
            </NavLink>
          </nav>
        </div>
        <Routes>
          <Route path="/admin/main" element={<AdminPageHome />}></Route>
          <Route path="/userlist" element={<UserTable />}></Route>
          <Route path="/reports" element={<ReportTable />}></Route>
        </Routes>
      </div>
    </>
  );
};

export default SideBar;
