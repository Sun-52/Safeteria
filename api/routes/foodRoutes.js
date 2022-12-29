const taskBuilder = require("../controllers/foodController.js");

module.exports = (app) => {
  app.route("/food/:restaurant_id").post(taskBuilder.add_menu);
  app
    .route("/food/:user_id")
    .get(taskBuilder.get_user_order)
    .patch(taskBuilder.select_phase_test);
  app.route("/food/phase").get(taskBuilder.test);
  app
    .route("/food/:user_id/:food_id")
    .post(taskBuilder.increase_foodamount_test)
    .patch(taskBuilder.decrease_foodamount_test);
};
