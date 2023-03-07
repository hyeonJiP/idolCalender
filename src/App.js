import { useEffect, useState } from "react";
import Modal from "./UI/Modal";
import EditUser from "./userForm/EditUser";
import LogIn from "./userForm/Login";
import ReportSchedule from "./userForm/ReportSchedule";
import SignUp from "./userForm/SignUp";
import { rest } from "msw";

const todos = ["먹기", "자기", "놀기"];

function App() {
  const [todos, setTodos] = useState();

  console.log(todos);

  rest.post("/todos", (req, res, ctx) => {
    todos.push(req.body);
    return res(ctx.status(201));
  });

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
