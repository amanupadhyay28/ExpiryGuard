const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const loginSignupRoute = require("./routes/loginSignupRoute");

app.use(cors());
app.use(express.json());

const connectDB = require("./database/db_connection");
connectDB();

app.listen(process.env.PORT ? process.env.PORT : 5000, () => {
  console.log(`app listening on PORT ${process.env.PORT}`);
});

app.use("/", loginSignupRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});
