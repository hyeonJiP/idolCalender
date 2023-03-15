import Modal from "./UI/Modal";
import EditUser from "./pages/userFormPage/EditUser";
import LogIn from "./pages/userFormPage/Login";
import ReportSchedule from "./pages/userFormPage/ReportSchedule";
import SignUp from "./pages/userFormPage/SignUp";
import Calendar from "./pages/calendarPage/calendar/Calendar";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";
import { useEffect, useState } from "react";
import Home from "./pages/mainPage/Home";
import ScrollToTop from "./UI/ScrollUP";
import { getCookie } from "./cookie/cookie";
import AdminPage from "./pages/adminPage/AdminPage";
import axios from "axios";

//commit
function App() {
  /**전역에 토큰 허용 */
  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.xsrfHeaderName = "X-CSRFToken";
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.isLogin);

  const isLoginCookie = getCookie("isLogin");

  /**저장된 토큰을 가져와서 redux저장소에 넣어주기 */
  useEffect(() => {
    console.log(isLoginCookie);
    if (isLoginCookie) {
      dispatch(authActions.logIn(true));
    }
  }, [dispatch, isLoginCookie]);

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />

        <Routes>
          <Route path="/admin" element={<AdminPage />} />

          {/* 메인페이지 */}
          <Route path="/" element={<Home />} />

          {/* 회원가입페이지 */}
          <Route
            path="/signup"
            element={isLogin ? <Navigate to="/" /> : <SignUp />}
          />

          {/* 로그인페이지 */}
          <Route
            path="/login"
            element={isLogin ? <Navigate to="/" /> : <LogIn />}
          />
          {/* 개인정보수정 */}
          <Route path="/edituser" element={<EditUser />} />

          <Route path="/calendar" element={<Calendar />} />
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
