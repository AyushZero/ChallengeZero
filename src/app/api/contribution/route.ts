import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { startOfDay, isToday } from 'date-fns';

export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    
    if (!name || !['Ayush', 'Sharu'].includes(name)) {
      return NextResponse.json({ error: 'Invalid user' }, { status: 400 });
    }

    await connectDB();
    
    const user = await User.findOne({ name });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if user has already contributed today
    if (user.lastContribution && isToday(new Date(user.lastContribution))) {
      return NextResponse.json({ error: 'Already contributed today' }, { status: 400 });
    }

    const today = startOfDay(new Date());
    
    // Update user's contribution
    const updatedUser = await User.findOneAndUpdate(
      { name },
      {
        $inc: { totalAmount: 10, streak: 1 },
        $push: { contributions: { amount: 10, date: today } },
        lastContribution: today
      },
      { new: true }
    );

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Contribution error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const users = await User.find({});
    return NextResponse.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 