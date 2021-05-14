const express = require("express");
const { NotExtended } = require("http-errors");
const SneakerModel = require("../models/Sneaker");
const router = new express.Router();
const UserModel = require("./../models/User");

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
  SneakerModel.findById(req.params.id, req.body).populate('tag')
  .then((result) => res.render("one_product", {sneaker : result}))
  .catch(next)
});

module.exports = router;
