import React, { useState } from 'react';

function NewTodo({ onAddTask }) {
  // ১. স্টেট ডিক্লেয়ার করা (অবজেক্ট হিসেবে)
  const [inputValue, setInputValue] = useState({ title: "", desc: "" });
  const { title, desc } = inputValue;

  // ২. ইনপুট হ্যান্ডলার (এটি কম্পোনেন্টের ভেতরে থাকতে হবে)
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputValue((oldValue) => {
      return { ...oldValue, [name]: value };
    });
  };

  // ৩. সাবমিট হ্যান্ডলার
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && desc.trim()) {
      onAddTask(inputValue); // প্যারেন্টকে ডেটা পাঠানো হচ্ছে
      setInputValue({ title: "", desc: "" }); // ইনপুট বক্স খালি করা
    } else {
      alert("দয়া করে title এবং desc দুটোই লিখুন!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-600 p-5">
      <label className="text-white" htmlFor='title'>Title:</label>
      <input 
        className="text-xl rounded-full bg-fuchsia-100 text-blue-800 shadow-lg m-3 p-2.5"
        type="text" 
        value={title} 
        name='title'
        onChange={handleChange}
        placeholder="title লিখুন..." 
      />

      <label className="text-white" htmlFor='desc'>Desc:</label>
      <input 
        className="text-xl rounded-full bg-fuchsia-100 text-blue-800 shadow-lg m-3 p-2.5"
        type="text" 
        value={desc} 
        name='desc'
        onChange={handleChange}
        placeholder="desc লিখুন..." 
      />
      
      <button className="text-white bg-green-600 border rounded-full p-2 px-4" type="submit">
        যোগ করুন
      </button>
    </form>
  );
}

export default NewTodo;