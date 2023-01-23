const express = require("express");
const donenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();
const userRoute = require("./routes/userRoute");
// app.use(donenv.config());

app.use(express.json());
app.use("/users", userRoute);
mongoose.set("strictQuery", false);

mongoose
  .connect(
    "mongodb+srv://dipesh:Lampofgod01@cluster0.as1lelf.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.log(err));

app.listen(3000);
