import React, { useState } from 'react';
import NewTodo from './TodoApp/NewTodo';
import Todo from './TodoApp/Todo';

function App() {
  const [tasks, setTasks] = useState([]);

  // নতুন টাস্ক যোগ করার ফাংশন (এটি NewTodo তে পাঠানো হবে)
  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  // টাস্ক ডিলিট করার ফাংশন (এটি Todo তে পাঠানো হবে)
  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="text-center bg-blue-400">
      <h1 className ="text-3xl font-bolder bg-violet text-violet-500 underline ">আমার টুডু অ্যাপ</h1>
      {/* NewTodo তে ফাংশন পাঠানো হচ্ছে */}
      <NewTodo onAddTask={handleAddTask} /> 
      
      {/* Todo তে ডাটা এবং ডিলিট ফাংশন পাঠানো হচ্ছে */}
      <Todo tasks={tasks} onDeleteTask={handleDeleteTask} />
    </div>
  );
}

export default App;