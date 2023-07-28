import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import rootRoute from "./routes/root.js";
const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to mongoDB");
  } catch (err) {
    console.log("cannot connect to mongooDB");
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected");
});

//middleware

app.use(express.json());
// app.use("*", rootRoute);
app.use("/auth", authRoute);
app.use("/user", userRoute);

app.get((error, req, res, next) => {
  const errorStatus = error.status;
  const errorMessage = error.message;
  return res.status(errorStatus).json({ message: errorMessage });
});

app.listen(8800, () => {
  connect();
  console.log("connected to backend.");
});
