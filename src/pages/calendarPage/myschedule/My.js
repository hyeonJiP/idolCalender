import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./My.module.scss";

function My() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState({ title: "", when: "", contents: "" });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [editableTodoPk, setEditableTodoPk] = useState(null);

  useEffect(() => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;
    const day = selectedDate.getDate();
    axios
      .get(
        `http://127.0.0.1:8000/api/v1/users_calendar/${year}/${month}/${day}/`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedDate]);

  // 삭제
  const handleDelete = (year, month, day, pk) => {
    axios
      .delete(
        `http://127.0.0.1:8000/api/v1/users_calendar/${year}/${month}/${day}/${pk}`,
        { withCredentials: true }
      )
      .then((res) => {
        const newTodos = todos.filter((todo) => todo.pk !== pk);
        setTodos(newTodos);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 등록
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/v1/users_calendar/", input, {
        withCredentials: true,
      })
      .then((res) => {
        setTodos([...todos, res.data]);
        setInput({ title: "", when: "", contents: "" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = (year, month, day, pk) => {
    axios
      .put(
        `http://127.0.0.1:8000/api/v1/users_calendar/${year}/${month}/${day}/${pk}`,
        input,
        { withCredentials: true }
      )
      .then((res) => {
        const updatedTodos = todos.map((todo) => {
          if (todo.pk === pk) {
            return res.data;
          } else {
            return todo;
          }
        });
        setTodos(updatedTodos);
        setInput({ title: "", when: "", contents: "" });
        setEditableTodoPk(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 입력 폼의 값을 변경할 때마다 실행되며, 입력 폼의 값을 관리하는 input state를 업데이트
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // 선택한 날짜를 변경할 때마다 실행되며, 선택한 날짜를 관리하는 selectedDate state를 업데이트
  const handleDateChange = (e) => {
    setSelectedDate(new Date(e.target.value));
  };

  return (
    <div className={styles.todo}>
      {/* <h1>Todo App</h1> */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={input.title}
          onChange={handleChange}
        />
        <input
          type="date"
          name="when"
          value={input.when}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Contents"
          name="contents"
          value={input.contents}
          onChange={handleChange}
        />
        <button type="submit">Add</button>
      </form>
      {todos.map((todo) => (
        <div key={todo.pk}>
          {editableTodoPk === todo.pk ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate(todo.year, todo.month, todo.day, todo.pk);
              }}
            >
              <input
                type="text"
                placeholder="Title"
                name="title"
                value={input.title}
                onChange={handleChange}
              />
              <input
                type="date"
                name="when"
                value={input.when}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Contents"
                name="contents"
                value={input.contents}
                onChange={handleChange}
              />
              <button type="submit">Update</button>
              <button type="button" onClick={() => setEditableTodoPk(null)}>
                Cancel
              </button>
            </form>
          ) : (
            <>
              <h3>{todo.title}</h3>
              <p>{todo.when}</p>
              <p>{todo.contents}</p>
              <button onClick={() => setEditableTodoPk(todo.pk)}>Edit</button>
              <button
                onClick={() =>
                  handleDelete(todo.year, todo.month, todo.day, todo.pk)
                }
              >
                Delete
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default My;
