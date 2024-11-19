'use client';
import { debounce } from 'lodash';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import CarCard from '@/components/CarCard';
import SearchBar from '@/components/SearchBar';

export default function Dashboard() {
  const router = useRouter();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Fetch cars from the API
  const fetchCars = async (searchTerm = '') => {
    setLoading(true);
    try {
      const url = searchTerm
        ? `/api/cars/get?search=${encodeURIComponent(searchTerm)}`
        : '/api/cars/get';
      
      const res = await fetch(url);
      
      if (!res.ok) {
        if (res.status === 401) {
          router.push('/login');
          return;
        }
        throw new Error('Failed to fetch cars');
      }

      const data = await res.json();
      setCars(data);
    } catch (error) {
      setError(error.message || 'An error occurred while fetching cars');
    } finally {
      setLoading(false);
    }
  };

  // Using useEffect to fetch cars when the page loads
  useEffect(() => {
    fetchCars();
  }, []);

  // Debounced search function to optimize API calls
  const handleSearch = debounce((searchTerm) => {
    setLoading(true);
    fetchCars(searchTerm);
  }, 500); // 500ms debounce

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">Loading your cars...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-600 text-xl font-semibold">
          {error}
          <button
            onClick={() => fetchCars()}
            className="block mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">My Cars</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* No cars found message */}
      {cars.length === 0 ? (
        <div className="text-center">
          <p className="mb-4 text-gray-600">No cars found</p>
          <button
            onClick={() => router.push('/cars/create')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-300"
          >
            Add Your First Car
          </button>
        </div>
      ) : (
        // Display cars in a grid layout
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
}
