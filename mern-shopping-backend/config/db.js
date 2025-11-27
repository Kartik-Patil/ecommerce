const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Simple connection - no deprecated options needed
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`\n✅ MongoDB Atlas Connected Successfully!`);
    console.log(`   Host: ${conn.connection.host}`);
    console.log(`   Database: ${conn.connection.name}`);
    console.log(`   Port: ${conn.connection.port}\n`);
  } catch (error) {
    console.error(`\n❌ MongoDB Connection Error:`);
    console.error(`   ${error.message}\n`);
    process.exit(1);
  }
};

module.exports = connectDB;
