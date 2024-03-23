const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes").auth;
const itemRoute = require("./routes").itemAuth;
const cors = require("cors");

//連結到mongoDB
mongoose
  .connect("mongodb://localhost:27017/ecomDB")
  .then(() => {
    console.log("連結到mongoDB...");
  })
  .catch((e) => {
    console.log(e);
  });

// moddlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/user", authRoute);
app.use("/api/item", itemRoute);

//連結到後端伺服器
app.listen(8080, () => {
  console.log("伺服器後端聆聽在port 8080...");
});
