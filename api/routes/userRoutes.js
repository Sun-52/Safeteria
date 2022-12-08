const taskBuilder = require("../controllers/userController.js");

module.exports = (app) => {
  app.route("/user").post(taskBuilder.sign_up);
  app.route("/user/:email").get(taskBuilder.sign_in);
  app.route("/user/:user_id").patch(taskBuilder.change_role);
  app.route("/user/money/increase").patch(taskBuilder.increase_money);
  app.route("/user/money/decrease").patch(taskBuilder.decrease_money);
  app.route("/user/pay/:user_id/:order:id").patch(taskBuilder.pay);
};
