import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // ডাটা লোড হওয়ার আগে loading true এবং আগের error clear করে নেওয়া ভালো
    setIsLoading(true);
    
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw Error(`Error ${ res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setIsLoading(false);
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, [url]);

  // Hook থেকে শুধু ডাটা এবং স্টেটগুলো রিটার্ন করুন
  return { data, isLoading, error };
};

export default useFetch;