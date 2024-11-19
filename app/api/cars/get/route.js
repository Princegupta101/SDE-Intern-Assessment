import { NextResponse } from 'next/server';

import { auth } from '@/utils/authMiddleware';
import Car from '@/models/carModel';
import dbConnect from '@/utils/dbConfig';

export async function GET(request) {
  try {
    const user = await auth(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    
    let query = { userId: user.userId };
    if (search) {
      query.$text = { $search: search };
    }
    
    const cars = await Car.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json(cars);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}