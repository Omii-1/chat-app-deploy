const mongoose = require ("mongoose")

const connectToMongoose = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI)
    console.log("Database connected successfully");

  } catch (error) {
    console.log("Error while connecting to mongoose", error.message);
  }
}

module.exports = connectToMongoose