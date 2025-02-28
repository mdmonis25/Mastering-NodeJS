const express = require("express");
const app = express();

const userRouter = require("./routes/user");
const { connectMongoDb } = require("./connection");
const { logReqRes } = require("./middlewares");

connectMongoDb("mongodb://127.0.0.1:27017/db-monis1")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.log("Mongo Error", err);
  });

const PORT = 8000;
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));
app.use("/api/users", userRouter);
app.listen(PORT, () => `Server Started at port ${PORT}`);
