import React, {useEffect,useState} from 'react';
import useFetch from './useFetch';
import Toastify from './Toastify'


const UseEff = () => {
  const {data, isLoading, error}=useFetch("https://jsonplaceholder.typicode.com/todos")
  
const loMa=<p className="text-3xl font-bold text-blue-300">Message is loading </p>
  return (
    <div className="max-h-screen bg-amber-500 flex justify-center items-center inline-block">
    {data && data.slice(0,10).map(data=>{
      return <p className="text-2xl font-light text-green-900 m-1" key={data.id}>{data.title}</p>
      
    })}
   {isLoading && loMa}
   {error && <p>{error}</p>}
   <Toastify />
    </div>
  )
}

export default UseEff;