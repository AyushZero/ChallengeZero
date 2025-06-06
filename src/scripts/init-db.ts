import connectDB from '../lib/db';
import User from '../models/User';

async function initDB() {
  try {
    await connectDB();
    
    // Check if users already exist
    const existingUsers = await User.find({});
    if (existingUsers.length > 0) {
      console.log('Users already exist in the database');
      process.exit(0);
    }

    // Create both users
    await User.create([
      {
        name: 'Ayush',
        totalAmount: 0,
        streak: 0,
        lastContribution: null,
        contributions: []
      },
      {
        name: 'Sharu',
        totalAmount: 0,
        streak: 0,
        lastContribution: null,
        contributions: []
      }
    ]);

    console.log('Successfully initialized database with users');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initDB(); 