import React, { useState, useEffect } from "react";
import axios from "axios";

const UserSchedule = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [when, setWhen] = useState("");
  const [editableTodoId, setEditableTodoId] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/v1/users_calendar/",
          {
            withCredentials: true,
          }
        );
        setTodos(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTodos();
  }, []);

  // 삭제기능
  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/v1/users_calendar/${id}`, {
        withCredentials: true,
      });
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  // 추가기능
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

  // 업데이트기능
  const handleUpdateTodo = async (id) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/v1/users_calendar/${id}`,
        {
          title,
          contents,
          when,
        },
        {
          withCredentials: true,
        }
      );
      const updatedTodo = response.data;
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
      setTitle("");
      setContents("");
      setWhen("");
      setEditableTodoId(null);
    } catch (error) {
      console.log(error);
    }
  };

  // 편집기능
  const handleEditTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setTitle(todoToEdit.title);
    setContents(todoToEdit.contents);
    setWhen(todoToEdit.when);
    setEditableTodoId(id);
  };

  return (
    <div>
      <h1>UserSchedule</h1>
      <form>
        <div>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="contents">Contents: </label>
          <input
            type="text"
            id="contents"
            value={contents}
            onChange={(e) => setContents(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="when">When: </label>
          <input
            type="date"
            id="when"
            value={when}
            onChange={(e) => setWhen(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleAddTodo}>
          Add Todo
        </button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editableTodoId === todo.id ? (
              <div>
                <div>
                  <label htmlFor="title">Title: </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="contents">Contents: </label>
                  <input
                    type="text"
                    id="contents"
                    value={contents}
                    onChange={(e) => setContents(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="when">When: </label>
                  <input
                    type="text"
                    id="when"
                    value={when}
                    onChange={(e) => setWhen(e.target.value)}
                  />
                </div>
                <button type="button" onClick={() => handleUpdateTodo(todo.id)}>
                  Update
                </button>
                <button type="button" onClick={() => setEditableTodoId(null)}>
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <div>
                  <strong>Title:</strong> {todo.title}
                </div>
                <div>
                  <strong>Contents:</strong> {todo.contents}
                </div>
                <div>
                  <strong>When:</strong> {todo.when}
                </div>
                <button type="button" onClick={() => handleEditTodo(todo.id)}>
                  Edit
                </button>
                <button type="button" onClick={() => handleDeleteTodo(todo.id)}>
                  Delete
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
