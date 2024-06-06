const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Database connected successfully");
      });
  } catch (error) {
    console.log("Error connecting to database", error);
  }
};

module.exports = connectDb;
