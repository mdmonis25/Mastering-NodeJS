const express = require("express");
const app = express();

const userRouter = require("./routes/user");
const {connectMongoDb} = require("./connection");

connectMongoDb("mongodb://127.0.0.1:27017/db-monis1");

const PORT = 8000;

app.use(express.urlencoded({ extended: false }));
app.use("/user", userRouter);







app.listen(PORT, () => `Server Started at port ${PORT}`);
