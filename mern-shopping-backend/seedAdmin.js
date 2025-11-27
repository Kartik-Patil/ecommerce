const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const seedAdmin = async () => {
  try {
    // Delete existing admin
    await Admin.deleteMany({});

    // Create admin
    const admin = await Admin.create({
      email: 'admin@shophub.com',
      password: 'admin123'
    });

    console.log('✅ Admin created successfully:');
    console.log('   Email: admin@shophub.com');
    console.log('   Password: admin123');
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
