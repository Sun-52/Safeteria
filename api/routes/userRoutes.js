const taskBuilder = require("../controllers/userController.js");

module.exports = (app) => {
  app.route("/user").post(taskBuilder.sign_in);
  app.route("/user/:user_id").patch(taskBuilder.change_role);
};
