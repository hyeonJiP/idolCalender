import { getCookie, removeCookie, setCookie } from "../../cookie/cookie";
import Layout from "../../UI/Layout";
import SideBar from "./SideBar";

const AdminPage = () => {
  if (!getCookie("isLogin")) {
    setCookie("isLogin", { is_admin: false, pick: false }, { path: "/" });
  }

  return (
    <>
      <Layout>
        <SideBar />
      </Layout>
    </>
  );
};

export default AdminPage;
