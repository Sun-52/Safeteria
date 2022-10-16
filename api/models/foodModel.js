const mongoose = require("mongoose");

const { Schema } = mongoose;

const foodSchema = new Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
});

module.exports = mongoose.model("food", foodSchema);
