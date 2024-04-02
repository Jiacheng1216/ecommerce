const router = require("express").Router();
const Cart = require("../models").cart;

router.use((req, res, next) => {
  console.log("正在接收一個跟購物車有關的請求...");
  next();
});

// 增加商品到購物車的router
router.post("/", async (req, res) => {
  try {
    let { userID, itemID, quantity, imagePath, title, price } = req.body;
    let postCart = new Cart({
      userID,
      itemID,
      quantity,
      imagePath,
      title,
      price,
    });

    let savedCart = await postCart.save();
    return res.send({
      msg: "成功將商品加入到購物車",
      savedCart,
    });
  } catch (e) {
    return res.status(500).send("無法將商品加入到購物車...");
  }
});

//以訂單id刪除購物車商品
router.delete("/delete/:id", async (req, res) => {
  try {
    const cartID = req.params.id;
    const deleteCart = await Cart.findByIdAndDelete(cartID);
    if (!deleteCart) return res.status(404).json({ error: "訂單未找到" });
    return res.send({
      msg: "刪除訂單成功",
      deleteCart,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send("刪除購物車商品時出錯");
  }
});

//查找資料庫中所有訂單
router.get("/showCart", async (req, res) => {
  try {
    const allCart = await Cart.find();
    return res.send(allCart);
  } catch (e) {
    res.status(500).send("無法查詢所有訂單");
  }
});

//以用戶id來查詢購物車中的商品
router.get("/selfCart/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const selfCart = await Cart.find({ userID: userId });
    res.send(selfCart);
  } catch (e) {
    res.status(500).send("無法查詢個人加入購物車的商品");
  }
});

//以訂單id更新訂單資訊
router.put("/edit/:id", async (req, res) => {
  const cartID = req.params.id;
  const { quantity } = req.body;

  try {
    const cart = await Cart.findById(cartID);
    if (!cartID) return res.status(404).send("訂單未找到");

    cart.quantity = quantity;

    const updatedCart = await cart.save();
    res.status(200).send({ msg: "訂單資訊更新成功!", updatedCart });
  } catch (e) {
    res.status(500).send("無法更新訂單資訊");
  }
});

module.exports = router;
