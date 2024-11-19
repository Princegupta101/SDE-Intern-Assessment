'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function CarCard({ car }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
      {/* Image Section */}
      <div className="relative h-48 w-full">
        <Image
          src={car.images[0] || '/placeholder.png'}
          alt={car.title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>

      {/* Card Content */}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{car.title}</h3>
        <p className="text-gray-600 mb-3 text-sm line-clamp-3">{car.description}</p>

        {/* Tags Section */}
        <div className="flex flex-wrap gap-2 mb-3">
          {Object.entries(car.tags).map(([key, value]) =>
            value ? (
              <span
                key={key}
                className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium hover:bg-blue-200 transition duration-300"
              >
                {value}
              </span>
            ) : null
          )}
        </div>

        {/* View Details Button */}
        <div className="flex justify-between items-center text-sm">
          <Link
            href={`/cars/${car._id}`}
            className="text-blue-600 hover:text-blue-800 font-medium transition duration-200"
          >
            View Details
          </Link>
          <span className="text-gray-700 font-medium">
            {car.price ? `$${car.price.toFixed(2)}` : 'Contact for Price'}
          </span>
        </div>
      </div>
    </div>
  );
}
