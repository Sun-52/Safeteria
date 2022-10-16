const taskBuilder = require("../controllers/historyController.js");

module.exports = (app) => {
  app
    .route("/qrcode/:order_id")
    .post(taskBuilder.generate_qr)
    .get(taskBuilder.scan_qr);
  app.route("/qrcode/:order_id/:user_id").patch(taskBuilder.serve_order);
  app.route("/history/all/:user_id").get(taskBuilder.get_all_history);
  app.route("/history/spe/:order_id").get(taskBuilder.view_history);
};
