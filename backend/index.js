const express = require("express");
const dbConnect = require("./configs/dbConnect");
const app = express();
const dotenv = require("dotenv").config();
const { notFound, errorHandler } = require("./middlewares/errorHandller.js");
const authRoutes = require("./routes/authRoutes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 5000;

// connecDB
dbConnect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// routes
app.use("/api/user", authRoutes);

// middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
