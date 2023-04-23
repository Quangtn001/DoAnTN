const express = require("express");
const dbConnect = require("./configs/dbConnect");
const app = express();
const dotenv = require("dotenv").config();
const { notFound, errorHandler } = require("./middlewares/errorHandller.js");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/prodcategoryRoutes");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const PORT = process.env.PORT || 5000;

// connecDB
dbConnect();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// routes
app.use("/api/user", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/category", categoryRoutes);

// middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
