const express = require("express");
const connectDB = require("./config/database");
const app = express(); // IT CREATES AN APPLICATION OF EXPRESS JS
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(3000, () => {
      console.log("SERVER IS SUCCESSFULLY LISTENING ON PORT 3000...");
    });
  })
  .catch((err) => {
    console.log("Database can not be connected!!");
  });
