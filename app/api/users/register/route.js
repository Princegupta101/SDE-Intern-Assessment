import { NextResponse } from 'next/server';

import dbConnect from '@/utils/dbConfig';
import User from '@/models/userModel';

export async function POST(request) {
  try {
    await dbConnect();
    
    const { email, password } = await request.json();
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }
    
    const user = await User.create({ email, password });
    
    return NextResponse.json(
      { message: 'User registered successfully' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
