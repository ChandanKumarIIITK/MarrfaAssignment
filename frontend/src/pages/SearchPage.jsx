import  { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const sampleData = [
  { name: "India", capital: "New Delhi" },
  { name: "United States", capital: "Washington, D.C." },
  { name: "France", capital: "Paris" },
  { name: "Japan", capital: "Tokyo" },
  { name: "Germany", capital: "Berlin" },
];

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [useSampleData, setUseSampleData] = useState(true);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchCountries = async () => {
      if (!useSampleData) {
        try {
          const response = await fetch("https://restcountries.com/v3.1/all");
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          const countryList = data.map((country) => ({
            name: country.name.common,
            capital: country.capital ? country.capital[0] : "N/A",
          }));
          setCountries(countryList);
        } catch (error) {
          console.error("Error fetching countries:", error);
          setCountries(sampleData); 
        }
      } else {
        setCountries(sampleData); 
      }
    };

    fetchCountries();
  }, [useSampleData]);

  
  const handleSearch = () => {
    if (!query.trim()) {
      alert("Please enter a search term.");
      return;
    }

    const filteredResults = countries.filter(
      (country) =>
        country.name.toLowerCase().includes(query.toLowerCase()) ||
        country.capital.toLowerCase().includes(query.toLowerCase())
    );

    navigate("/results", { state: { query, results: filteredResults } });
  };


  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="py-6 bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto">
          <h1 className="text-center text-4xl font-bold">Country Search</h1>
        </div>
      </header>

      {/* Search Section */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-xl p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
            Search for a country or capital!
          </h2>

          {/* Toggle Sample/API Data */}
          <div className="mb-4 text-center">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-blue-600"
                checked={useSampleData}
                onChange={() => setUseSampleData(!useSampleData)}
              />
              <span className="ml-2 text-gray-700">
                Use Sample Data
              </span>
            </label>
          </div>

          {/* Search Input */}
          <input
            type="text"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter country or capital..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="w-full mt-4 p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
