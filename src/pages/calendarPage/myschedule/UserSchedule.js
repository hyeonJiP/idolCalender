import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./UserSchedule.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

const UserSchedule = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [when, setWhen] = useState("");
  const [originalWhen, setOriginalWhen] = useState("");

  const [editableTodoPk, setEditableTodoPk] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [showModal, setShowModal] = useState(false);

  // selectedDate가 변경될 때마다 API에서 일정을 가져옴
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/v1/users_calendar/`, {
        withCredentials: true,
      })
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedDate]);

  // 일정을 삭제하는 함수
  const handleDeleteTodo = (pk, when) => {
    const year = when.split("-")[0]; // year
    const month = when.split("-")[1]; // month
    const day = when.split("-")[2]; // day
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

  // 일정을 추가하는 함수
  const handleAddTodo = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/users_calendar/",
        {
          title,
          contents,
          when,
        },
        {
          withCredentials: true,
        }
      );
      setTodos((prevTodos) => [...prevTodos, response.data]);
      setTitle("");
      setContents("");
      setWhen("");
    } catch (error) {
      console.log(error);
    }
  };

  // 일정을 업데이트하는 함수
  // const handleUpdateTodo = (pk) => {
  //   console.log("원래 when:" + originalWhen);
  //   console.log("수정 when:" + when);

  //   // const year = when.split("-")[0];
  //   // const month = when.split("-")[1];
  //   // const day = when.split("-")[2];

  //   const year = originalWhen.split("-")[0]; // 선택한 일정의 원래 when 값에서 year 추출
  //   const month = originalWhen.split("-")[1]; // 선택한 일정의 원래 when 값에서 month 추출
  //   const day = originalWhen.split("-")[2]; // 선택한 일정의 원래 when 값에서 day 추출

  //   axios
  //     .put(
  //       `http://127.0.0.1:8000/api/v1/users_calendar/${year}/${month}/${day}/${pk}`,
  //       {
  //         title: title,
  //         contents: contents,
  //         year: year,
  //         month: month,
  //         day: day,
  //         // when: originalWhen, // 선택한 일정의 원래 when 값 사용
  //       },
  //       { withCredentials: true }
  //     )
  //     .then((res) => {
  //       const updatedTodos = todos.map((todo) => {
  //         if (todo.pk === pk) {
  //           return {
  //             ...todo,
  //             title: title,
  //             contents: contents,
  //             when: originalWhen, // 선택한 일정의 원래 when 값 사용
  //           };
  //         } else {
  //           return todo;
  //         }
  //       });
  //       setTodos(updatedTodos);
  //       setTitle("");
  //       setContents("");
  //       setWhen("");
  //       setEditableTodoPk(null);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  // 일정을 업데이트하는 함수
  const handleUpdateTodo = (pk) => {
    console.log("update when:" + when);
    const year = when.split("-")[0];
    const month = when.split("-")[1];
    const day = when.split("-")[2];
    axios
      .put(
        `http://127.0.0.1:8000/api/v1/users_calendar/${year}/${month}/${day}/${pk}`,
        {
          title: title,
          contents: contents,
          when: when,
        },
        { withCredentials: true }
      )
      .then((res) => {
        const updatedTodos = todos.map((todo) => {
          if (todo.pk === pk) {
            return {
              ...todo,
              title: title,
              contents: contents,
              when: when,
            };
          } else {
            return todo;
          }
        });
        setTodos(updatedTodos);
        setTitle("");
        setContents("");
        setWhen("");
        setEditableTodoPk(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 일정을 편집하는 함수
  const handleEditTodo = (pk) => {
    const todoToEdit = todos.find((todo) => todo.pk === pk);
    setTitle(todoToEdit.title);
    setContents(todoToEdit.contents);
    setWhen(todoToEdit.when);
    setOriginalWhen(todoToEdit.when); // 선택한 일정의 원래 when 값을 originalWhen 상태값으로 설정
    setEditableTodoPk(pk);
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => setShowModal(!showModal)}
        className={styles.button}
      >
        {showModal ? "닫기" : "추가하기"}
      </button>
      {showModal && (
        <div className={styles.modal}>
          <form className={styles.form}>
            <div className={styles.div}>
              <label htmlFor="title" className={styles.label}>
                Title:{" "}
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={styles.input}
              />
            </div>
            <div>
              <label htmlFor="contents" className={styles.label}>
                Contents:{" "}
              </label>
              <input
                type="text"
                id="contents"
                value={contents}
                onChange={(e) => setContents(e.target.value)}
                className={styles.input}
              />
            </div>
            <div>
              <label htmlFor="when" className={styles.label}>
                When:{" "}
              </label>
              <input
                type="date"
                id="when"
                value={when}
                onChange={(e) => setWhen(e.target.value)}
                className={styles.input}
              />
            </div>
            <button
              type="button"
              onClick={handleAddTodo}
              className={styles.button}
            >
              Add Todo
            </button>
            {/* <button
              type="button"
              onClick={() => setShowModal(false)}
              className={styles.button}
            >
              Close
            </button> */}
          </form>
        </div>
      )}

      <ul>
        {todos.map((todo) => (
          <li key={todo.pk}>
            {/* 수정 버튼 눌렀을 때 나오는 부분 */}
            {editableTodoPk === todo.pk ? (
              <div>
                <div className={styles.test}>
                  <label htmlFor="title" className={styles.label}>
                    Title:{" "}
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={styles.input}
                  />
                </div>
                <div>
                  <label htmlFor="contents" className={styles.label}>
                    Contents:{" "}
                  </label>
                  <input
                    type="text"
                    id="contents"
                    value={contents}
                    onChange={(e) => setContents(e.target.value)}
                    className={styles.input}
                  />
                </div>
                <div>
                  <label htmlFor="when" className={styles.label}>
                    When:{" "}
                  </label>
                  <input
                    type="date"
                    id="when"
                    value={when}
                    onChange={(e) => setWhen(e.target.value)}
                    className={styles.input}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleUpdateTodo(todo.pk)}
                  className={styles.button}
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setEditableTodoPk(null)}
                  className={styles.button}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className={styles.userScheduleItem}>
                {/* 원래 출력되는 부분 */}
                <div>title: {todo.title}</div>
                <div>contents: {todo.contents}</div>
                <div>when: {todo.when}</div>
                <button
                  type="button"
                  onClick={() => handleEditTodo(todo.pk)}
                  className={styles.button}
                >
                  <FontAwesomeIcon icon={faPen} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleDeleteTodo(todo.pk, todo.when);
                  }}
                  className={styles.button}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default UserSchedule;
