import React from 'react';

const DeleteButton = ({ onClick }) => {
  return (
    <button 
      className="flex items-end p-1.5 hover:scale-110 transition-transform" 
      onClick={onClick}
    > 
      <i className="bg-red-200 fa fa-trash fa-2x p-2 rounded-full"></i>
    </button>
  );
};

export default DeleteButton;