const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://nadhiyabollam18:MongoDb%40123@cluster0.dtt1p.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
