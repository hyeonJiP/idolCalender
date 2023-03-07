import Modal from "./UI/Modal";
import EditUser from "./pages/userFormPage/EditUser";
import LogIn from "./pages/userFormPage/Login";
import ReportSchedule from "./pages/userFormPage/ReportSchedule";
import SignUp from "./pages/userFormPage/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/mainPage/MainPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* 메인페이지 */}
          <Route path="/" element={<MainPage />} />

          {/* 회원가입페이지 */}
          <Route path="/signup" element={<SignUp />} />

          {/* 로그인페이지 */}
          <Route path="/login" element={<LogIn />} />
          {/* 개인정보수정 */}
          <Route path="/edituser" element={<EditUser />} />

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
