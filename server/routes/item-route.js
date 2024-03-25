const router = require("express").Router();
const ItemValidation = require("../validation").itemValidation;
const Item = require("../models").item;
const User = require("../models").user;
const multer = require("multer");
const path = require("path");

router.use((req, res, next) => {
  console.log("正在接收一個跟商品有關的請求...");
  next();
});

//接收前端上傳的圖片
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

//上傳圖片的router
router.post("/postPhoto", upload.single("photo"), async (req, res) => {
  try {
    res.send(req.file);
  } catch (e) {
    return res.send(500).send("無法上傳圖片");
  }
});

//刊登商品的請求
router.post("/", async (req, res) => {
  //確認資料是否符合規範
  let { error } = ItemValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let { title, description, price, seller, imagePath } = req.body;
    let postItem = new Item({
      title,
      description,
      price,
      seller,
      imagePath,
    });

    let savedItem = await postItem.save();
    return res.send({
      msg: "成功刊登商品",
      savedItem,
    });
  } catch (e) {
    return res.status(500).send("無法儲存刊登的商品...");
  }
});

//查詢資料庫中所有商品
router.get("/showItems", async (req, res) => {
  try {
    const allItems = await Item.find();
    return res.send(allItems);
  } catch (e) {
    console.log(e);
  }
});

//以id來查詢個人刊登的物品
router.get("/selfItems/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const selfItems = await Item.find({ "seller.sellerId": id });
    res.send(selfItems);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
