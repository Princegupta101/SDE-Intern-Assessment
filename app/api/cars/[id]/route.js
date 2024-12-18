import { NextResponse } from 'next/server';

import { auth } from '@/utils/authMiddleware';
import Car from '@/models/carModel';
import dbConnect from '@/utils/dbConfig';

export async function GET(request, { params }) {
  try {
    const user = await auth(request);
    if (!user) {
      console.error('Unauthorized access attempt for GET car');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    await dbConnect();
    
    if (!params.id) {
      return NextResponse.json(
        { error: 'Car ID is required' },
        { status: 400 }
      );
    }

    const car = await Car.findOne({
      _id: params.id,
      userId: user.userId,
    }).lean(); // Use .lean() for performance optimization
    
    if (!car) {
      return NextResponse.json(
        { error: 'Car not found' },
        { status: 404 }
      );
    }
    
    // Remove __v and other internal fields if needed
    const { __v, ...carResponse } = car;
    
    return NextResponse.json(carResponse);
  } catch (error) {
    console.error('GET Car Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to retrieve car', 
        details: 'An internal error occurred. Please try again later.' 
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const user = await auth(request);
    if (!user) {
      console.error('Unauthorized access attempt for PATCH car');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    await dbConnect();
    
    if (!params.id) {
      return NextResponse.json(
        { error: 'Car ID is required' },
        { status: 400 }
      );
    }

    let updates;
    try {
      updates = await request.json();
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    // Prevent updating certain fields
    const { userId, _id, ...allowedUpdates } = updates;

    if (Object.keys(allowedUpdates).length === 0) {
      return NextResponse.json(
        { error: 'No valid updates provided' },
        { status: 400 }
      );
    }

    const car = await Car.findOneAndUpdate(
      { _id: params.id, userId: user.userId },
      allowedUpdates,
      { 
        new: true, 
        runValidators: true,
        context: 'query'
      }).lean(); // .lean() for performance

    if (!car) {
      return NextResponse.json(
        { error: 'Car not found or unauthorized' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(car);
  } catch (error) {
    console.error('PATCH Car Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to update car', 
        details: 'An internal error occurred. Please try again later.' 
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const user = await auth(request);
    if (!user) {
      console.error('Unauthorized access attempt for DELETE car');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    await dbConnect();
    
    if (!params.id) {
      return NextResponse.json(
        { error: 'Car ID is required' },
        { status: 400 }
      );
    }

    const car = await Car.findOneAndDelete({
      _id: params.id,
      userId: user.userId,
    });

    if (!car) {
      return NextResponse.json(
        { error: 'Car not found or unauthorized' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { 
        message: 'Car deleted successfully',
        deletedCarId: params.id 
      }
    );
  } catch (error) {
    console.error('DELETE Car Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to delete car', 
        details: 'An internal error occurred. Please try again later.' 
      },
      { status: 500 }
    );
  }
}
