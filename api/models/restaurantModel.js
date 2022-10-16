const mongoose = require("mongoose");

const { Schema } = mongoose;

const restaurantSchema = new Schema({
  name: {
    type: String,
  },
  food_list: [
    {
      type: Schema.Types.ObjectId,
      ref: "food",
    },
  ],
});

module.exports = mongoose.model("restaurant", restaurantSchema);
