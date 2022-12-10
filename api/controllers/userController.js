const { truncateSync } = require("fs");
const mongoose = require("mongoose");
const user = mongoose.model("user");
const order = mongoose.model("order");

// exports.sign_in = async (req, res) => {
//   let userInfoResponse = await fetch(
//     "https://www.googleapis.com/userinfo/v2/me",
//     {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     }
//   );

//   let _userInfo = await userInfoResponse.json();
//   // TODO use token and check in server
//   _userInfo = {
//     name: _userInfo.name,
//     email: _userInfo.email,
//     picture: _userInfo.picture,
//     googleId: _userInfo.id,
//     provider: "google",
//   };
//   user.findOne({ googleId: _userInfo.googleId }, (err, user) => {
//     if (err) {
//       res.send(err);
//     } else if (null) {
//       newUser = new user(_userInfo);
//       newUser.save((err, user) => {
//         if (err) res.send(err);
//         res.json(user);
//       });
//     } else {
//       res.send(_userInfo);
//     }
//   });
// };

exports.sign_up = async (req, res) => {
  const exist = await user.exists({ email: req.body.email });
  if (exist == null) {
    const newUser = new user(req.body);
    newUser.save((err, user) => {
      if (err) res.send(err);
      res.json(user);
    });
  } else {
    user.findOne({ email: req.body.email }, (err, user) => {
      if (err) res.send(err);
      res.json(user);
    });
  }
};

exports.sign_in = (req, res) => {
  user.findOne({ email: req.params.email }, (err, user) => {
    if (err) res.send(err);
    res.json(user);
  });
};

exports.get_user = (req, res) => {
  user.findById(req.params.user_id, (err, user) => {
    if (err) res.send(err);
    res.json(user);
  });
};

exports.change_role = (req, res) => {
  user.findByIdAndUpdate(
    req.params.user_id,
    { role: req.body.role },
    (err, user) => {
      if (err) res.send(err);
      res.json(user);
    }
  );
};

exports.increase_money = async (req, res) => {
  const current_user = user.findById(req.params.user_id);
  const before_money = current_user.money;
  try {
    before_money = before_money + req.query.amount;
    await current_user.save();
    res.json(current_user);
  } catch (e) {
    console.log(e);
  }
};

exports.decrease_money = async (req, res) => {
  const current_user = user.findById(req.params.user_id);
  const before_money = current_user.money;
  try {
    before_money = before_money - req.query.amount;
    await current_user.save();
    res.json(current_user);
  } catch (e) {
    console.log(e);
  }
};

exports.pay = async (req, res) => {
  const random = Math.floor(Math.random() * 9000 + 1000).toString();
  order.findByIdAndUpdate(
    req.params.order_id,
    { que: random },
    (err, order) => {
      if (err) res.send(err);
      res.json(order);
    }
  );
  const current_user = await user.findById(req.params.user_id);
  const before_money = current_user.money;
  console.log(before_money, "before money");
  try {
    current_user.money = before_money - req.query.amount;
    await current_user.save();
  } catch (e) {
    console.log(e);
  }
};
