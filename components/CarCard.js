'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function CarCard({ car }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition hover:scale-105 hover:shadow-xl">
      <div className="relative h-48 w-full">
        <Image
          src={car.images[0] || '/placeholder.png'}
          alt={car.title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{car.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-3">{car.description}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {Object.entries(car.tags || {}).map(
            ([key, value]) =>
              value && (
                <span
                  key={key}
                  className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium hover:bg-blue-200 transition"
                >
                  {value}
                </span>
              )
          )}
        </div>
        <div className="flex justify-between items-center mt-3 text-sm">
          <Link href={`/cars/${car._id}`} className="text-blue-600 hover:text-blue-800 font-medium">
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
