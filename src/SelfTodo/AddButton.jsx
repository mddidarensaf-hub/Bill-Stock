import React from 'react';

const AddButton = () => {
  return (
    <button 
      type="submit" 
      className="text-center flex items-center justify-center bg-green-500 rounded-2xl p-1.5 hover:bg-green-600 transition-colors"
    >
      Add Todo
    </button>
  );
};

export default AddButton;