import Modal from "./UI/Modal";
import EditUser from "./pages/userFormPage/EditUser";
import LogIn from "./pages/userFormPage/Login";
import ReportSchedule from "./pages/userFormPage/ReportSchedule";
import SignUp from "./pages/userFormPage/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";
import { useEffect, useState } from "react";
import Home from "./pages/mainPage/Home";
import ScrollToTop from "./UI/ScrollUP";
import Calendar from "./pages/calendarPage/Calendar";
import { getCookie, removeCookie, setCookie } from "./cookie/cookie";
import moment from "moment";
import { fetchingData } from "./cookie/backData";

function App() {
  const dispatch = useDispatch();
  const reduxUserToken = useSelector((state) => state.auth.userToken);

  useEffect(() => {
    const userToken = getCookie("userToken");
    // console.log(userToken);
    if (userToken) {
      dispatch(authActions.logIn(userToken));
    }
  }, [dispatch, reduxUserToken]);

  console.log(reduxUserToken);

  /**아이돌 데이터 받아오기 */
  // const BASE_URL = "http://127.0.0.1:8000/api/v1/idols/";
  // const fetchingData = fetch(BASE_URL, {
  //   headers: {},
  // })
  //   .then((data) => data.json())
  //   .then((result) => {
  //     console.log(result[0].idol_profile);
  //   });

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* 메인페이지 */}
          <Route path="/" element={<Home />} />

          {/* 회원가입페이지 */}
          <Route path="/signup" element={<SignUp />} />

          {/* render={() => (isLogin ? <Redirect to="/" /> : <Login />) */}
          {/* 로그인페이지 */}
          <Route path="/login" element={<LogIn />} />
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
          {/* 스케줄제보하기 */}
          {/* <Modal>
          <ReportSchedule />
          </Modal> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
