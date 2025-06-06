import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ['Ayush', 'Sharu']
  },
  totalAmount: {
    type: Number,
    default: 0
  },
  streak: {
    type: Number,
    default: 0
  },
  lastContribution: {
    type: Date,
    default: null
  },
  contributions: [{
    amount: Number,
    date: Date
  }]
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User; 