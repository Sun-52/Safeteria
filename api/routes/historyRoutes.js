const taskBuilder = require("../controllers/historyController.js");

module.exports = (app) => {
  app.route("/qrcode/:order_id").patch(taskBuilder.gen_que);
  app.route("/que/:que").get(taskBuilder.get_que);
  app.route("/serve/:order_id").patch(taskBuilder.serve_order);
  app.route("/history/all/:user_id").get(taskBuilder.get_all_history);
  app.route("/history/spe/:order_id").get(taskBuilder.view_history);
};
