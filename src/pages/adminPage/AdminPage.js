import React from "react";
import Headar from "../../UI/Header";
import ReportTabe from "./ReportTable";
import styles from "./AdminPage.module.scss";

const AdminPage = () => {
  return (
    <>
      <Headar />
      <div className={styles.adminDiv}>
        <ReportTabe />
      </div>
    </>
  );
};

export default AdminPage;
