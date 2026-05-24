import React, { useState, useEffect } from 'react';

const url = "https://restcountries.com/v3.1/all?fields=name,capital,currencies,cca3,flags";

const Country = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const fetchData = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('ডাটা লোড করা সম্ভব হয়নি');
      const data = await res.json();
      setCountries(data);
      setFiltered(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(url);
  }, []);

  const handleChange = (e) => {
    const value = e.target.value.toLowerCase();
    const filteredItem = countries.filter((country) => {
      const countryName = country.name.common.toLowerCase();
      return countryName.includes(value);
    });
    setFiltered(filteredItem);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-center font-bold text-4xl underline decoration-blue-500 mb-10 text-gray-800">
        Country App
      </h1>
      
      <div className="container mx-auto">
        <input 
          type="text"
          placeholder="Search country..."
          onChange={handleChange}
          className="w-full border-2 border-blue-400 rounded-xl shadow-sm p-3 text-xl mb-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {isLoading && (
        <div className="flex justify-center items-center h-40">
          <h2 className="text-2xl font-semibold animate-pulse text-blue-600">Loading...</h2>
        </div>
      )}

      {error && (
        <div className="flex justify-center">
          <h2 className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </h2>
        </div>
      )}

      {!isLoading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 container mx-auto">
          {filtered.map((country) => {
            const { name, capital, flags, cca3, currencies } = country;

            // কারেন্সি ডাটা বের করার লজিক
            const currencyList = currencies ? Object.values(currencies) : [];

            return (
              <article 
                key={cca3} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200"
              >
                <img 
                  src={flags?.png} 
                  alt={name?.common} 
                  className="w-full h-40 object-cover border-b"
                />
                
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-1 truncate">
                    {name?.common}
                  </h3>
                  
                  {/* রাজধানী */}
                  <p className="text-gray-600 text-sm">
                    <span className="font-semibold text-blue-600">Capital:</span> {capital?.[0] || "N/A"}
                  </p>

                  {/* কারেন্সি বা মুদ্রা */}
                  <p className="text-gray-600 text-sm mt-1">
                    <span className="font-semibold text-green-600">Currency:</span> {
                      currencyList.length > 0 
                      ? `${currencyList[0].name} (${currencyList[0].symbol})` 
                      : "N/A"
                    }
                  </p>

                  <div className="mt-4">
                    <button className="bg-blue-500 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-blue-600 transition-colors w-full">
                      Details
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Country;