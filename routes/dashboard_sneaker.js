const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const SneakerModel = require("../models/Sneaker");

//GET all sneakers in the <table>
router.get("/products_manage", (req, res, next) => {
  SneakerModel.find()
    .then((result) => res.render("products_manage.hbs", { sneakers: result }))
    .catch(next);
});

// GET edit one sneaker
router.get("/product-edit/:id", (req, res, next) => {
    SneakerModel.findById(req.params.id)
    .then((result) => res.render("product_edit.hbs", { sneaker: result }))
    .catch(next);
});

// POST edit
router.post("/product-edit/:id", (req, res, next) => {
  SneakerModel.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.redirect("/products_manage"))
    .catch(next);
});

//GET add one sneaker
router.get("/products-add", (req, res) => {
  SneakerModel.find()
  .then ((result) => res.render("products_add.hbs", { sneaker: result }))  
});

//POST add
router.post("/products-add", (req, res, next) => {
  SneakerModel.create(req.body)
    .then(() => res.redirect("/products_manage"))
    .catch(next);
});

//GET delete one sneaker
router.get("/delete/:id", (req, res, next) => {
  console.log("CLICKED")
  SneakerModel.findByIdAndRemove(req.params.id)
    .then(() => res.redirect("/products_manage"))
    .catch(next);
});

module.exports = router;
