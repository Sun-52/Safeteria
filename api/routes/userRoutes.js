const taskBuilder = require("../controllers/userController.js");

module.exports = (app) => {
  app.route("/user").post(taskBuilder.sign_up);
  app
    .route("/user/:user_id")
    .get(taskBuilder.sign_in)
    .patch(taskBuilder.change_role);
  app.route("/user/monet/increase").patch(taskBuilder.increase_money);
  app.route("/user/monet/decrease").patch(taskBuilder.decrease_money);
  app.route("/user/pay/:user_id/:order:id").patch(taskBuilder.pay);
};
