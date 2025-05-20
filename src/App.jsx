import React, { useState } from "react";
import SearchForm from "./components/SearchForm";
import Results from "./components/Results";
import { searchPhotos, advancedSearchPhotos } from "./api";
import "./App.css";

export default function App() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const results = await searchPhotos({ query });
      setPhotos(results);
      setHasSearched(true);
    } catch (err) {
      setError(err.message);
      setPhotos([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAdvancedSearch = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const results = await advancedSearchPhotos({ query });
      setPhotos(results);
      setHasSearched(true);
    } catch (err) {
      setError(err.message);
      setPhotos([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-8 md:px-24 py-12 md:py-16 min-h-screen bg-gradient-to-b from-slate-100 via-slate-200 to-slate-400">
      <SearchForm
        onSearch={handleSearch}
        onAdvancedSearch={handleAdvancedSearch}
      />
      {loading && <p className="status-message">Loading...</p>}
      {error && <p className="status-message">Error: {error}</p>}
      <Results photos={photos} hasSearched={hasSearched} />
    </section>
  );
}
