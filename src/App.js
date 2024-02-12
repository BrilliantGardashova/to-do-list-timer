import React, { useState } from "react";
import uniqid from "uniqid";

function App() {
  const [list, setList] = useState([]);
  const [todo, setTodo] = useState({
    text: "",
    completed: false,
    id: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo({
      ...todo,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo.text.trim() === "") return;

    const newTodo = {
      ...todo,
      id: uniqid()
    };

    setList([...list, newTodo]);
    setTodo({
      text: "",
      completed: false,
      id: 0
    });

    // Установка таймера для удаления нового элемента через 2 секунды
    setTimeout(() => {
      setList(list.filter(item => item.id !== newTodo.id));
    }, 2000);
  };

  function toggle(id) {
    setList(list.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="text"
          value={todo.text}
          onChange={handleChange}
          placeholder="Add new todo"
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {list.map((item) => (
          <li
            key={item.id}
            onClick={() => toggle(item.id)}
            style={{ textDecoration: item.completed ? "line-through" : "none" }}
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
