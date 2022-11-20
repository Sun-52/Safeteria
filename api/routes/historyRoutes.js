const taskBuilder = require("../controllers/historyController.js");

module.exports = (app) => {
  app
    .route("/qrcode/:order_id")
    .patch(taskBuilder.gen_que)
    .get(taskBuilder.get_que);
  app.route("/qrcode/:que").patch(taskBuilder.serve_order);
  app.route("/history/all/:user_id").get(taskBuilder.get_all_history);
  app.route("/history/spe/:order_id").get(taskBuilder.view_history);
};
