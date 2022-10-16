const mongoose = require("mongoose");
const restaurant = mongoose.model("restaurant");

//not in application
exports.add_restaurant = (req, res) => {
  const newRestaurant = new restaurant(req.body);
  newRestaurant.save((err, restaurant) => {
    if (err) res.send(err);
    res.json(restaurant);
  });
};

//in application
exports.view_restaurant = (req, res) => {
  restaurant
    .findById(req.params.restaurant_id)
    .populate("food_list")
    .exec((err, restaurant) => {
      if (err) res.send(err);
      res.send(restaurant);
    });
};

exports.get_all_restaurant = (req, res) => {
  restaurant.find({}, (err, restaurant) => {
    if (err) res.send(err);
    res.json(restaurant);
  });
};

exports.search = (req, res) => {
  console.log(req.query.search);
  restaurant.find(
    { name: { $regex: req.query.search, $options: "i" } },
    (err, restaurant) => {
      if (err) res.send(err);
      res.json(restaurant);
    }
  );
};
