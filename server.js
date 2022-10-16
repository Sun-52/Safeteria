const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

global.food = require("./api/models/foodModel");
global.order = require("./api/models/orderModels");
global.restaurant = require("./api/models/restaurantModel");
global.user = require("./api/models/userModel");

const restaurantRoutes = require("./api/routes/restaurantRoutes");
const foodRoutes = require("./api/routes/foodRoutes");
const userRoutes = require("./api/routes/userRoutes");
const historyRoutes = require("./api/routes/historyRoutes");

mongoose.connect(
  "mongodb+srv://Sun:Su214221@safeteria.qbiuwz4.mongodb.net/Safeteria_main",
  { useNewUrlParser: true }
);

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

userRoutes(app);
foodRoutes(app);
restaurantRoutes(app);
historyRoutes(app);

app.listen(port);

app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});

console.log(`Server started on port ${port}`);
