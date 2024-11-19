import { NextResponse } from 'next/server';

import { auth } from '@/utils/authMiddleware';
import Car from '@/models/carModel';
import dbConnect from '@/utils/dbConfig';

export async function POST(request) {
  try {
    const user = await auth(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    await dbConnect();
    
    const carData = await request.json();
    const car = await Car.create({
      ...carData,
      userId: user.userId,
    });
    
    return NextResponse.json(car, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}