const mongoose = require("mongoose");

const { Schema } = mongoose;

const orderSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  food_list: [
    {
      type: Schema.Types.ObjectId,
      ref: "food",
    },
  ],
  amount_of_food: [
    {
      type: Number,
    },
  ],
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "restaurant",
  },
  phase: {
    type: String,
  },
  date: {
    type: String,
  },
  status: {
    type: String,
  },
  qr_code: {
    type: String,
  },
});

module.exports = mongoose.model("order", orderSchema);
