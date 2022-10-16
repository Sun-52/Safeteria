const taskBuilder = require("../controllers/restaurantController.js");

module.exports = (app) => {
  app
    .route("/restaurant")
    .post(taskBuilder.add_restaurant)
    .get(taskBuilder.get_all_restaurant);
  app.route("/restaurant/:restaurant_id").get(taskBuilder.view_restaurant);
  app.route("/restaurant/search").get(taskBuilder.search);
};
