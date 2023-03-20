import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faUsers,
  faHome,
  faUserGear,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import { getCookie } from "../../cookie/cookie";
import AdminPageHome from "./AdminPageHome";
import styles from "./SideBar.module.scss";
import UserTable from "./table/UserTable";
import ReportTable from "./table/ReportTable";

const SideBar = () => {
  const adminName = getCookie("isLogin").nickname;

  return (
    <>
      <div className={styles.adminContents}>
        <div className={styles.sideBar}>
          <div className={styles.sideBarUser}>
            <img alt="" />
            <div className={styles.sideBarTitle}>
              <FontAwesomeIcon icon={faUserGear} />
              {adminName}
            </div>
          </div>
          <nav className={styles.sideBarNav}>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${styles.navAble}` : `${styles.navDisable}`
              }
              to="/adminpage/main"
            >
              <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
              Main
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${styles.navAble}` : `${styles.navDisable}`
              }
              to="/adminpage/userlist"
            >
              <FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>
              UserList
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${styles.navAble}` : `${styles.navDisable}`
              }
              to="/adminpage/reports"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              ReportTable
            </NavLink>
          </nav>
        </div>
        <Routes>
          <Route path="/adminpage/main" element={<AdminPageHome />}></Route>
          <Route path="/userlist" element={<UserTable />}></Route>
          <Route path="/reports" element={<ReportTable />}></Route>
        </Routes>
      </div>
    </>
  );
};

export default SideBar;
