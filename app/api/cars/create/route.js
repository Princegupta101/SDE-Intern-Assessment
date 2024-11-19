import { validationResult } from 'express-validator'; // Optional, if you want validation
import { NextResponse } from 'next/server';

import { auth } from '@/utils/authMiddleware';
import Car from '@/models/carModel';
import dbConnect from '@/utils/dbConfig';

export async function POST(request) {
  try {
    // Authorization check
    const user = await auth(request);
    if (!user) {
      console.error('Unauthorized access attempt');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Connect to the database
    await dbConnect();

    // Parse the car data from the request body
    const carData = await request.json();

    // Example validation (you can add more fields as needed)
    if (!carData.model || !carData.make || !carData.year) {
      return NextResponse.json(
        { error: 'Missing required fields: model, make, year' },
        { status: 400 }
      );
    }

    // Create the new car record
    const car = await Car.create({
      ...carData,
      userId: user.userId,
    });

    // Return success response with the car object
    return NextResponse.json(car, { status: 201 });
  } catch (error) {
    console.error('Error creating car:', error.message);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}
