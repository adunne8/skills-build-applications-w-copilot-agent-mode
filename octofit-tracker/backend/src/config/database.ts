import mongoose from 'mongoose';

const db = mongoose.connection;
const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

export async function connectDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');
  } catch (error) {
    console.error('Error connecting to octofit_db:', error);
    process.exit(1);
  }
}

db.on('error', console.error.bind(console, 'connection error:'));

export default db;
