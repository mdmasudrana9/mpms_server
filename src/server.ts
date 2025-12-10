import mongoose from "mongoose";
import config from "./app/config";
import app from "./app";

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://masud:TitForTat953218@cluster0.myz2n.mongodb.net/mpms?appName=Cluster0"
    );
    console.log("MongoDB connected");

    const port = config.port;
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${config.port}`);
    });
  } catch (err) {
    console.error("Failed to start server", err);
    process.exit(1);
  }
};

start();
