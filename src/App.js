import { useEffect, useState } from "react";
import Modal from "./UI/Modal";
import EditUser from "./userForm/EditUser";
import LogIn from "./userForm/Login";
import ReportSchedule from "./userForm/ReportSchedule";
import SignUp from "./userForm/SignUp";

function App() {
  const [todos, setTodos] = useState();

  useEffect(() => {
    fetch("/todos")
      .then((data) => data.json())
      .then((data) => setTodos(data));
  }, []);

  console.log(todos);

  return (
    <>
      <SignUp />
      {/* <LogIn /> */}
      {/* <EditUser /> */}
      {/* <Modal>
        <ReportSchedule />
      </Modal> */}
    </>
  );
}

export default App;
