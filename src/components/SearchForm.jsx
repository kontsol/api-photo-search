import React, { useState } from "react";

export default function SearchForm({ onSearch, onAdvancedSearch }) {
  const [query, setQuery] = useState("");

  // Activate search only if input not empty
  const handleSimpleSearch = () => {
    if (query.trim()) onSearch(query);
  };

  const handleAdvancedSearch = () => {
    if (query.trim()) onAdvancedSearch(query);
  };

  const buttonClass =
    "flex-1 bg-slate-100 text-indigo-600 py-3 px-6 font-semibold text-lg border-2  border-indigo-600 rounded-lg shadow-md hover:shadow-indigo-500 hover:bg-indigo-900 hover:text-white";

  return (
    <div className="flex flex-col items-center justify-center gap-5 w-full md:max-w-xl mx-auto mb-10">
      <input
        className="w-full placeholder:text-slate-400 text-slate-700 text-lg border-2 border-indigo-600 hover:border-indigo-900 rounded-md p-3 focus:outline-none focus:border-indigo-500 bg-slate-100 shadow-lg focus:shadow-indigo-300"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="flex w-full gap-5">
        <button className={buttonClass} onClick={handleSimpleSearch}>
          Simple Search
        </button>
        <button className={buttonClass} onClick={handleAdvancedSearch}>
          Advanced Search
        </button>
      </div>
    </div>
  );
}
