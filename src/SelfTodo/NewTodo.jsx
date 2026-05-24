import React, { useState } from 'react';
import AddButton from "./AddButton";
const NewTodo = (props) => {
  const [todos, setTodos] = useState({ title: "", desc: "" });

  const handleChange = (e) => {
    const { name, value } = e.target; // Destructuring for cleaner code
    setTodos((prevTodos) => {
      return { ...prevTodos, [name]: value };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onATodo(todos);
    setTodos({ title: "", desc: "" }); // Resets the form
  };

  return (
    <div className="max-h-screen bg-amber-300 ">
      <form onSubmit={handleSubmit}>
        <div className="border border-2
        border-cyan-400 m-3 rounded-3xl p-1.5">
          <label className="font-bold font-sans text-2xl text-indigo-500" htmlFor="title">Title:</label>
          <input className=" border-2 rounded-3xl m-1.5 border-red-700 text-center p-1.5"
            type="text" 
            name="title" 
            id="title" 
            value={todos.title} // Fixed: use todos.title
            onChange={handleChange}
          />
        </div>
        <div className="border border-2 border-cyan-700 m-3 rounded-3xl p-1.5">
          <label className="font-bold text-2xl"htmlFor="desc">Desc:</label>
          <textarea className="text-center border-2 rounded-full p-1.5 text"
            name="desc" 
            id="desc" 
            value={todos.desc} // Fixed: use todos.desc
            onChange={handleChange}
          />
        </div>
       <AddButton />
      </form>
    </div>
  );
};

export default NewTodo;