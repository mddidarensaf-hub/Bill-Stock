import React from 'react';
import {ToastContainer, toast} from "react-toastify";

const Toastify = () => {
const notify=()=>toast('Iam toastify message ');
  return (
    <div className="bg-green-500">
      <button onClick={notify} className="border-2 border-black rounded-3xl bg-red-600">Toast</button>
      <ToastContainer />
    </div>
  )
}

export default Toastify;