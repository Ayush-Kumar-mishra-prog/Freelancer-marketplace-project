const connectDB = async (mongoose) => {
  const mongoUrl = process.env.MONGO_URL;
  if (!mongoUrl) {
    throw new Error("MONGO_URL is not set");
  }

  await mongoose.connect(mongoUrl);
  console.log("Database connected");
  return mongoose.connection;
};

export default connectDB;