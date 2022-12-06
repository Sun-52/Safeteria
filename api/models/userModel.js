const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  profile: {
    type: String,
  },
  googleId: {
    type: Schema.Types.ObjectId,
  },
  truemoney_number: {
    type: String,
  },
  role: {
    type: String,
    //student and shop
  },
  money: {
    type: Number,
  },
});

module.exports = mongoose.model("user", userSchema);
