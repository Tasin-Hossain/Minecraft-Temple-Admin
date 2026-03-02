// src/config/db.js   (অথবা config/database.js যেখানে রাখো)
import mongoose from 'mongoose';
import { config } from './env.js';
import dns from 'dns'

dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.MONGO_URI, {
      // Recommended options (Mongoose + MongoDB driver 2025+)
      serverSelectionTimeoutMS: 5000,     // কতক্ষণ সার্ভার খুঁজবে
      socketTimeoutMS: 45000,             // সকেট টাইমআউট
      maxPoolSize: 50,                    // কানেকশন পুল সাইজ (অ্যাপ স্কেল করলে বাড়াও)
      minPoolSize: 10,                    // মিনিমাম পুল
      family: 4,                          // IPv4 prefer (optional, IPv6 issue এড়াতে)
    });

    console.log(`✅ MongoDB Connected Successfully!`);
    console.log(`   - Host: ${conn.connection.host}`);
    console.log(`   - Database: ${conn.connection.name}`);

    // Optional: Connection events (production-এ খুব দরকারি)
    mongoose.connection.on('connected', () => {
      console.log('MongoDB connected event fired');
    });

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err.message);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB disconnected! Trying to reconnect...');
    });

  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error.message);
    process.exit(1);
  }
};

export default connectDB;