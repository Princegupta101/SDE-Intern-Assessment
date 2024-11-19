// /app/api/cars/route.js
import Car from '@/models/carModel';
import dbConnect from '@/utils/dbConfig';

export async function GET(request) {
  try {
    await dbConnect();

    // Fetch all cars without filtering by user ID
    const cars = await Car.find();

    return new Response(JSON.stringify(cars), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching cars:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch cars' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
