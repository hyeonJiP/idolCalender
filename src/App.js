import Modal from "./UI/Modal";
import EditUser from "./pages/userFormPage/EditUser";
import LogIn from "./pages/userFormPage/Login";
import ReportSchedule from "./pages/userFormPage/ReportSchedule";
import SignUp from "./pages/userFormPage/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";
import { useEffect } from "react";
import Home from "./pages/mainPage/Home";
import ScrollToTop from "./UI/ScrollUP";
import { getCookie } from "./cookie/cookie";
import AdminPage from "./pages/adminPage/AdminPage";
import Layout from "./UI/Layout";
import CalendarPage from "./pages/calendarPage/hj_calendarPage/CalendarPage";
import Calendar from "./pages/calendarPage/calendar/Calendar";
import axios from "axios";

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
      {/* {reduxUserToken && (
        <Admin dataProvider={dataProvider}>
          <Resource name="admin" list={ListGuesser} />
        </Admin>
      )} */}
      <BrowserRouter>
        <ScrollToTop />

        <Routes>
          <Route path="/admin" element={<AdminPage />} />

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
            path="/:idolId"
            element={
              <Layout>
                <Calendar />
              </Layout>
            }
          />

          {/* 회원가입페이지 */}
          <Route path="/signup" element={<SignUp />} />

          {/* render={() => (isLogin ? <Redirect to="/" /> : <Login />) */}
          {/* 로그인페이지 */}
          <Route path="/login" element={<LogIn />} />
          {/* 개인정보수정 */}
          <Route path="/edituser" element={<EditUser />} />

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
