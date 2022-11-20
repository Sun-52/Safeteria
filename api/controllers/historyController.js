const mongoose = require("mongoose");
const order = mongoose.model("order");
const ORCode = require("qrcode");
const fs = require("fs");
const textToImage = require("text-to-image");
const uuid = require("uuid");
//firebase
const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");

const firebaseConfig = {
  apiKey: "AIzaSyA4FeRCLUEayYu_GIwhBJgTTNNkiLU6sNg",
  authDomain: "safeteria-a37cc.firebaseapp.com",
  projectId: "safeteria-a37cc",
  storageBucket: "safeteria-a37cc.appspot.com",
  messagingSenderId: "521992946022",
  appId: "1:521992946022:web:097279a3a3ba36a277c8a7",
  measurementId: "G-H2W43CKH53",
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const storageRef = ref(storage, "some-child");

exports.generate_qr = async (req, res) => {
  const opts = {
    errorCorrectionLevel: "H",
    type: "terminal",
    quality: 0.95,
    margin: 1,
    color: {
      dark: "#000000",
      light: "#FFF",
    },
  };
  await ORCode.toFile("public/qr.png", req.params.order_id, opts)
    .then((qrImage) => {
      console.log("Qr created");
    })
    .catch((err) => {
      res.send(err);
    });
  var qr_image = await fs.readFileSync("public/qr.png");
  console.log(qr_image);
  var filename = "qr.png" + uuid.v1();
  var imageRef = ref(storage, filename);
  var metatype = { contentType: "image/png", name: filename };
  await uploadBytes(imageRef, qr_image, metatype).then((snapshot) => {
    console.log("image uploaded");
  });
  await getDownloadURL(ref(storage, filename)).then((url) => {
    res.send(url);
    order.findByIdAndUpdate(
      req.params.order_id,
      { $set: { status: "paid", qr_code: url } },
      (err, order) => {
        if (err) res.send(err);
        console.log("order status updated");
      }
    );
  });
};

exports.gen_que = async (req, res) => {
  const random = Math.floor(Math.random() * 9000 + 1000);
  const user_order = order.findById(req.params.order_id);
  const user_que = user_order.que;
  try {
    user_que = random;
    user_order.que = user_que;
    await user_order.save();
    res.json(user_order);
  } catch (err) {
    res.send(err);
  }
};

exports.get_que = (req, res) => {
  mongoose
    .findById(req.params.order_id)
    .populate("food_list")
    .exec((err, order) => {
      if (err) res.send(err);
      res.json(order);
    });
};

exports.scan_qr = (req, res) => {
  order
    .findById(req.params.order_id)
    .populate("food_list")
    .exec((err, order) => {
      if (err) res.send(err);
      res.json(order);
    });
};

exports.serve_order = async (req, res) => {
  const sending_user = await user.findById(req.params.user_id);
  const sending_order = await order.findById(req.params.order_id);
  if (sending_user.role === "shop") {
    // order.findByIdAndUpdate(
    //   req.params.order_id,
    //   { qr_code: "", status: "served" },
    //   (err, order) => {
    //     if (err) res.send(err);
    //     res.json(order);
    //   }
    // );
    try {
      sending_order.qr_code = "";
      sending_order.status = "served";
      await sending_order.save();
      res.json(sending_order);
    } catch (err) {
      res.send(err);
    }
  } else {
    res.send("Don't have acess");
  }
};

exports.get_all_history = (req, res) => {
  order.find({ user_id: req.params.user_id }, (err, order) => {
    if (err) res.send(err);
    res.json(order);
  });
};

exports.view_history = (req, res) => {
  order
    .findById(req.params.order_id)
    .populate("food_list")
    .exec((err, order) => {
      if (err) res.send(err);
      res.json(order);
    });
};
