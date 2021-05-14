const express = require("express");
const { NotExtended } = require("http-errors");
const SneakerModel = require("../models/Sneaker");
const router = new express.Router();

router.get("/home", (req, res) => {
  res.render("index");
});

router.get("/sneakers/collection", async (req, res, next) => {
  try {
    res.render("products", {sneakers : await SneakerModel.find()});
  } catch(err) {
    next(err);
  }
});

router.get("/one-product/:id", (req, res,next) => {
  SneakerModel.findById(req.params.id).populate('tag')
});

router.get("/signup", (req, res) => {
  res.send("sneak");
});

router.get("/signin", (req, res) => {
  res.send("love");
});


module.exports = router;
