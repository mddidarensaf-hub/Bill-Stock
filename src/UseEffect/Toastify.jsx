import React from 'react';
import {ToastContainer, toast} from "react-toastify";

const Toastify = () => {
const notify=()=>toast('Iam toastify message ');
  return (
    <div>
      <button onClick={notify} className="border-2 border-black rounded-full bg-cyan-500 p-1.5 m-1.5">Toast</button>
      <ToastContainer />
    </div>
  )
}

export default Toastify