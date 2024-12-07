import { useLocation, useNavigate } from "react-router-dom";

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { query, results } = location.state || {};

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-6 sm:px-12">
        {/* Back Button */}
        <div className="flex justify-start mb-6">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition-all"
          >
            &larr; Back to Search
          </button>
        </div>

        {/* Search Results Heading */}
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
          Search Results for:{" "}
          <span className="text-blue-600">&quot;{query}&quot;</span>
        </h1>

        {/* Results Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.length > 0 ? (
            results.map((item, index) => (
              <div
                key={index}
                className="p-4 bg-white shadow rounded-lg flex flex-col"
              >
                <h2 className="text-lg font-bold text-gray-800">{item.name}</h2>
                <p className="text-sm text-gray-600">Capital: {item.capital}</p>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-lg text-gray-500">
              No results found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
