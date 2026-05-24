import React from 'react';
import DeleteButton from './DeleteButton';
const Todo = (props) => {
  const {onDet}=props;
  const handleClick=(id)=>{
    onDet(id);
  };
  return (
    <div className="h-screen w-11/12 bg-gray-300">
      {props.newTask.map((stask) => {
        // Added return and fixed the key reference
        return (
          <article key={stask.id}> 
            <h1>{stask.title}</h1>
            <p>{stask.desc}</p>

<DeleteButton onClick={() => handleClick(stask.id)} />

          </article>
        );
      })}
      <p>I am todo app</p>
      
      
    </div>
  );
};

export default Todo;