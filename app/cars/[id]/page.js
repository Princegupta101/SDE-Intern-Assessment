'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CarDetails({ params }) {
  const router = useRouter();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Directly accessing params.id without needing React.use()
  const { id } = params;

  useEffect(() => {
    if (!id) return;

    const fetchCar = async () => {
      try {
        const res = await fetch(`/api/cars/${id}`);
        
        if (!res.ok) {
          if (res.status === 401) {
            router.push('/login');
            return;
          }
          throw new Error('Failed to fetch car details');
        }

        const data = await res.json();
        setCar(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id, router]);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this car?')) {
      return;
    }

    try {
      const res = await fetch(`/api/cars/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete car');
      }

      router.push('/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full border-t-4 border-blue-600 w-16 h-16"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center">
        <p>{error}</p>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="text-center">
        <p>Car not found</p>
        <Link href="/dashboard" className="text-blue-600">Go back to dashboard</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      {/* Back Link */}
      <div className="mb-6">
        <Link href="/dashboard" className="text-blue-600 flex items-center">
          ← Back to Dashboard
        </Link>
      </div>

      {/* Car Details Section */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 mx-4 md:mx-0 p-6">
        
        {/* Left Side: Image Section */}
        <div className="relative h-96 rounded-lg overflow-hidden">
          <Image
            src={car.images[currentImageIndex] || '/placeholder.png'}
            alt={car.title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
          
          {/* Thumbnails for image navigation */}
          {car.images.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {car.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full ${currentImageIndex === index ? 'bg-white' : 'bg-white/50'}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Car Details */}
        <div className="flex flex-col justify-between p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{car.title}</h1>
          <p className="text-gray-600 text-sm mb-6">{car.description}</p>
          
          {/* Tags Section */}
          <div className="flex flex-wrap gap-2 mb-6">
            {Object.entries(car.tags).map(([key, value]) => (
              value && (
                <span
                  key={key}
                  className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-700"
                >
                  {key.replace('_', ' ')}: {value}
                </span>
              )
            ))}
          </div>

          {/* Edit and Delete Buttons */}
          <div className="flex space-x-4 mt-auto">
            <Link
              href={`/cars/edit/${id}`}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
