import Modal from "./UI/Modal";
import EditUser from "./pages/userFormPage/EditUser";
import LogIn from "./pages/userFormPage/Login";
import ReportSchedule from "./pages/userFormPage/ReportSchedule";
import SignUp from "./pages/userFormPage/SignUp";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "./store/auth";
import { useEffect } from "react";
import Home from "./pages/mainPage/Home";
import ScrollToTop from "./UI/ScrollUP";
import { getCookie, setCookie } from "./cookie/cookie";

import AdminPage from "./pages/adminPage/AdminPage";
import Layout from "./UI/Layout";
import CalendarPage from "./pages/calendarPage/hj_calendarPage/CalendarPage";
import Calendar from "./pages/calendarPage/calendar/Calendar";
import axios from "axios";

function App() {
  const dispatch = useDispatch();

  if (!getCookie("isLogin")) {
    setCookie("isLogin", { is_admin: false, pick: false });
  }

  /**전역에 토큰 허용 */
  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.xsrfHeaderName = "X-CSRFToken";

  /**저장된 토큰을 가져와서 redux저장소에 넣어주기 */
  useEffect(() => {
    const isLoginCookie = getCookie("isLogin");
    if (isLoginCookie) {
      const loginData = {
        pick: { idolPk: isLoginCookie.pick, schedulePk: null },
        is_admin: isLoginCookie.is_admin,
      };

      dispatch(authActions.logIn(loginData));
    }
  }, [dispatch]);

  let isAdmin = getCookie("isLogin").is_admin;
  let isLogin = getCookie("isLogin").pick;

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />

        <Routes>
          <Route path="/*" element={<Navigate to="/"></Navigate>}></Route>
          {/* 관리자페이지 */}
          <Route
            path="/admin"
            element={isAdmin ? <AdminPage /> : <Navigate to={"/"} />}
          />
          {/* <Route path="/admin" element={<AdminPage />} /> */}

          {/* 메인페이지 */}
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />

          {/* 캘린더페이지 */}
          <Route
            path="/abc"
            element={
              <Layout>
                <Calendar />
              </Layout>
            }
          />

          {/* 회원가입페이지 */}
          <Route path="/signup" element={<SignUp />} />

          {/* 로그인페이지 */}
          <Route
            path="/login"
            element={isLogin || isAdmin ? <Navigate to="/" /> : <LogIn />}
            // element={<LogIn />}
          />
          {/* 개인정보수정 */}
          <Route
            path="/edituser"
            element={!isLogin ? <Navigate to="/" /> : <EditUser />}
          />

          <Route path="/calendar" element={<Calendar />} />

          <Route path="/calendarpage" element={<CalendarPage />} />

          <Route
            path="/report"
            element={
              <Modal>
                <ReportSchedule />
              </Modal>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
