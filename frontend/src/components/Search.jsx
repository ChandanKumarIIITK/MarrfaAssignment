import  { useState } from "react";
import axios from "axios";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [filter, setFilter] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/search`, {
        params: { query, filter },
      });
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Search Page</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="border rounded-md w-full px-4 py-2"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <select
          className="border rounded-md w-full px-4 py-2"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="category1">Category 1</option>
          <option value="category2">Category 2</option>
        </select>
      </div>
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Search
      </button>
      <div className="mt-6">
        {results.map((item, index) => (
          <div key={index} className="border p-4 rounded-md mb-2">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
