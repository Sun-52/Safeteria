const mongoose = require("mongoose");
const date = require("date-and-time");
const food = mongoose.model("food");
const order = mongoose.model("order");
const restaurant = mongoose.model("restaurant");

exports.add_menu = (req, res) => {
  const newFood = new food(req.body);
  restaurant.findOneAndUpdate(
    { _id: req.params.restaurant_id },
    { $push: { food_list: [newFood._id] } },
    (err, restaurant) => {
      if (err) res.send(err);
      console.log("Menu added to restaurant");
    }
  );
  newFood.save((err, food) => {
    if (err) res.send(err);
    res.json(food);
  });
};

exports.increase_foodamount = async (req, res) => {
  const exist = await order.exists({
    $and: [{ user_id: req.params.user_id }, { status: undefined }],
  });
  const add_food_process = async (user_id, food_id) => {
    const user_order = await order.findOne({
      user_id: user_id,
      status: undefined,
    });
    const user_food = user_order.food_list;
    const user_foodamount = user_order.amount_of_food;
    if (user_food.includes(food_id) == false) {
      console.log("add food false activated");
      order.findOneAndUpdate(
        { user_id: user_id, status: undefined },
        { $push: { food_list: food_id, amount_of_food: 1 } },
        (err, order) => {
          if (err) res.send(err);
          console.log("order updated");
        }
      );
    } else if (user_food.includes(food_id) == true) {
      console.log("add food true activated");
      const new_foodamount = user_foodamount[user_food.indexOf(food_id)] + 1;
      user_foodamount.splice(user_food.indexOf(food_id), 1, new_foodamount);
      order.findOneAndUpdate(
        { user_id: user_id, status: undefined },
        {
          amount_of_food: user_foodamount,
        },
        (err, order) => {
          if (err) res.send(err);
          console.log("order updated");
        }
      );
    }
    console.log(user_order);
  };
  // end of function
  if (exist == null) {
    console.log("user don't have order");
    const newOrder = new order();
    newOrder.user_id = req.params.user_id;
    newOrder.restaurant = await restaurant.findOne({
      food_list: req.params.food_id,
    });
    newOrder.save((err, order) => {
      if (err) res.send(err);
      console.log("order created");
    });
    const user_order = await order.findOne({ user_id: req.params.user_id });
    add_food_process(req.params.user_id, req.params.food_id);
  } else {
    console.log("user have order");
    add_food_process(req.params.user_id, req.params.food_id);
  }
};

exports.increase_foodamount_test = async (req, res) => {
  const exist = await order.exists({
    $and: [{ user_id: req.params.user_id }, { status: undefined }],
  });
  const add_food_process = async (user_id, food_id) => {
    const user_order = await order.findOne({
      user_id: user_id,
      status: undefined,
    });
    const user_food = user_order.food_list;
    const user_foodamount = user_order.amount_of_food;
    if (user_food.includes(food_id) == false) {
      try {
        user_food.push(food_id);
        user_foodamount.push(1);
        user_order.food_list = user_food;
        user_order.amount_of_food = user_foodamount;
        await user_order.save();
        res.json(user_order);
      } catch (err) {
        res.send(err);
      }
    } else if (user_food.includes(food_id) == true) {
      try {
        const new_foodamount = user_foodamount[user_food.indexOf(food_id)] + 1;
        user_foodamount.splice(user_food.indexOf(food_id), 1, new_foodamount);
        user_order.amount_of_food = user_foodamount;
        await user_order.save();
        res.json(user_order);
      } catch (err) {
        res.send(err);
      }
    }
  };
  if (exist == null) {
    console.log("user don't have order");
    const newOrder = new order();
    newOrder.user_id = req.params.user_id;
    newOrder.restaurant = await restaurant.findOne({
      food_list: req.params.food_id,
    });
    newOrder.save((err, order) => {
      if (err) res.send(err);
      console.log("order created");
    });
    const user_order = await order.findOne({ user_id: req.params.user_id });
    add_food_process(req.params.user_id, req.params.food_id);
  } else {
    console.log("user have order");
    add_food_process(req.params.user_id, req.params.food_id);
  }
};

exports.decrease_foodamount = async (req, res) => {
  const user_order = await order.findOne({
    user_id: req.params.user_id,
    status: undefined,
  });
  const user_food = user_order.food_list;
  const user_foodamount = user_order.amount_of_food;
  const new_foodamount =
    user_foodamount[user_food.indexOf(req.params.food_id)] - 1;
  console.log(new_foodamount);
  if (new_foodamount == 0) {
    console.log("last amount deleted");
    user_food.splice(user_food.indexOf(req.params.food_id));
    user_foodamount.splice(user_food.indexOf(req.params.user_id));
    order.findOneAndUpdate(
      { user_id: req.params.user_id, status: undefined },
      { $set: { food_list: user_food, amount_of_food: user_foodamount } },
      (err, order) => {
        if (err) res.send(err);
        res.json(order);
      }
    );
  } else {
    user_foodamount.splice(
      user_food.indexOf(req.params.food_id),
      1,
      new_foodamount
    );
    order.findOneAndUpdate(
      { user_id: req.params.user_id, status: undefined },
      {
        amount_of_food: user_foodamount,
      },
      (err, order) => {
        if (err) res.send(err);
        res.json(order);
      }
    );
    console.log(
      await order.findOne({ user_id: req.params.user_id, status: undefined })
    );
  }
};

exports.decrease_foodamount_test = async (req, res) => {
  const user_order = await order.findOne({
    user_id: req.params.user_id,
    status: undefined,
  });
  const user_food = user_order.food_list;
  const user_foodamount = user_order.amount_of_food;
  const new_foodamount =
    user_foodamount[user_food.indexOf(req.params.food_id)] - 1;
  if (new_foodamount == 0) {
    try {
      console.log(user_food.indexOf(req.params.food_id), "splice index");
      user_food.splice(user_food.indexOf(req.params.food_id));
      user_foodamount.splice(user_food.indexOf(req.params.food_id));
      user_order.food_list = user_food;
      user_order.amount_of_food = user_foodamount;
      await user_order.save();
      res.json(user_order);
    } catch (err) {
      res.send(err);
    }
  } else {
    try {
      user_foodamount.splice(
        user_food.indexOf(req.params.food_id),
        1,
        new_foodamount
      );
      user_order.amount_of_food = user_foodamount;
      await user_order.save();
      res.json(user_order);
    } catch (err) {
      res.send(err);
    }
  }
};

exports.get_user_order = (req, res) => {
  order
    .findOne({ user_id: req.params.user_id, status: undefined })
    .populate("food_list")
    .exec((err, order) => {
      if (err) res.send(err);
      res.json(order);
    });
};

exports.select_phase = async (req, res) => {
  order.findOneAndUpdate(
    { user_id: req.params.user_id, status: undefined },
    {
      $set: {
        phase: req.body.phase,
        date: date.format(new Date(), "YYYY/MM/DD"),
      },
    },
    (err, order) => {
      if (err) res.send(err);
      res.json(order);
    }
  );
};
exports.select_phase_test = async (req, res) => {
  const user_order = await order.findOne({
    user_id: req.params.user_id,
    status: undefined,
  });
  try {
    user_order.phase = req.body.phase;
    user_order.date = date.format(new Date(), "YYYY/MM/DD");
    await user_order.save();
    res.json(user_order);
  } catch (err) {
    res.send(err);
  }
};
