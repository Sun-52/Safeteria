const taskBuilder = require("../controllers/userController.js");

module.exports = (app) => {
  app.route("/user/auth").post(taskBuilder.sign_up);
  app.route("/user/auth/:email").get(taskBuilder.sign_in);
  app
    .route("/user/:user_id")
    .patch(taskBuilder.change_role)
    .get(taskBuilder.get_user);
  app.route("/user/money/increase/:user_id").patch(taskBuilder.increase_money);
  app.route("/user/money/decrease/:user_id").patch(taskBuilder.decrease_money);
  app.route("/user/pay/:user_id/:order_id").patch(taskBuilder.pay);
};
