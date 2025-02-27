// This is the user model

const mongoose = require("mongoose");

//Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/db-monis1")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.log("Mongo Error", err);
  });

//Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//Model
const User = mongoose.model("user", userSchema);

module.exports = User;