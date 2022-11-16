const taskBuilder = require("../controllers/userController.js");

module.exports = (app) => {
  app.route("/user").post(taskBuilder.sign_up);
  app.route("/user/:user_id").get(taskBuilder.sign_in).patch(taskBuilder.change_role);
};
