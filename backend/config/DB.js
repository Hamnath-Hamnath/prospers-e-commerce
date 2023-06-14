const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_DB_URL);
    return connection
  } catch (err) {
    console.log(`Mongo err ==> ${err}`.red.bold);
    process.exit(1);
  }
};

module.exports = connectDB;
