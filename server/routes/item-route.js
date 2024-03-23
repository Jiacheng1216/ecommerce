const router = require("express").Router();
const ItemValidation = require("../validation").itemValidation;
const Item = require("../models").item;

router.use((req, res, next) => {
  console.log("正在接收一個跟商品有關的請求...");
  next();
});

//刊登商品的請求
router.post("/", async (req, res) => {
  //確認資料是否符合規範
  let { error } = ItemValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let { title, description, price, seller } = req.body;
  let postItem = new Item({ title, description, price, seller });
  try {
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
