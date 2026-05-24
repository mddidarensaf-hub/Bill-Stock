import React, { useState } from 'react';
import NewTodo from './NewTodo';
import Todo from './Todo'; 

const Home = () => {
  const [tasks, setTasks] = useState([]); 
  const handleAddTodo = (newTodo) => {
    setTasks((prevTasks) => {
      return [...prevTasks, { id: Date.now(), ...newTodo }]; 
    });
  };
const handleDelete=(id)=>{
  setTasks((preTa)=>{
const filtered=preTa.filter((tas)=>tas.id!==id);
return filtered;
  })
  
  
}
  return (
    <div className="max-h-screen bg-emerald-100">
      {/* Ensure prop names match what NewTodo expects */}
      <NewTodo onATodo={handleAddTodo} />
      
      {/* Pass the tasks array to the Todo component */}
      <Todo newTask={tasks} onDet={handleDelete}/> 
    </div>
  );
};

export default Home;