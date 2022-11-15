const { urlencoded } = require("body-parser");
const colors = require("colors");
const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 3000;
const app = express();
const { errorHandler } = require("./middleware/errorMiddleWare");
const connectDB = require("./config/db");
app.listen(port, () => {
  console.log(`Port: ${port}`);
});

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);
//API Routes
app.use("/api/goals", require("./routes/goalsRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
