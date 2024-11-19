'use client';
import { useState, useEffect } from 'react';

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  let debounceTimer;

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      onSearch(value);
    }, 300); // 300ms debounce
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full text-gray-600 max-w-xl mx-auto mb-8">
      <div className="flex gap-2 items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search cars..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-500"
          aria-label="Search cars"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          aria-label="Submit search"
        >
          Search
        </button>
        {searchTerm && (
          <button
            onClick={handleClear}
            type="button"
            className="bg-gray-300 px-2 py-1 rounded-lg text-gray-600 hover:bg-gray-400"
            aria-label="Clear search"
          >
            Clear
          </button>
        )}
      </div>
    </form>
  );
}
