const mongoose = require("mongoose");
const user = mongoose.model("user");

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

exports.sign_up = (req, res) => {
  const newUser = new user(req.body);
  newUser.save((err, user) => {
    if (err) res.send(err);
    res.json(user);
  });
};

exports.sign_in = (req, res) => {
  user.findById(req.params.user_id, (err, user) => {
    if (err) res.send(err);
    res.json(user);
  });
};

exports.sync_truemoney = (req, res) => {};

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
