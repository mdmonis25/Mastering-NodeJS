const express = require("express");
const mongoose = require("mongoose");
const app = express();

const PORT = 8000;

app.use(express.urlencoded({ extended: false }));

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

//show users
app.get("/users", async (req, res) => {
  const users = await User.find({});
  const html = `<ol>${users
    .map((user) => `<li>${user.firstName}<br>${user.email}</li>`)
    .join("")}</ol>`;
  res.send(html);
});

// api for users
app.get("/api/users", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

//create user
app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_designation
  )
    return res.status(400).json({ message: "All fields Are Required" });

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_designation,
  });
  console.log(result);
  return res.status(201).json({ message: "Success" });
});

app.listen(PORT, () => `Server Started at port ${PORT}`);
