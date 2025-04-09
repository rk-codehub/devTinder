const express = require("express");
const connectDB = require("./config/database");
const app = express(); // IT CREATES AN APPLICATION OF EXPRESS JS
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(cors({
  origin: "http:localhost:5173",
  credentials: true,
}))
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");


app.get("/", (req, res) => {
  res.send("working fine")
});
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(7777, () => {
      console.log("SERVER IS SUCCESSFULLY LISTENING ON PORT 7777...");
    });
  })
  .catch((err) => {
    console.log("Database can not be connected!!");
  });
