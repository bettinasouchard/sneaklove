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

//POST edit
//GET add one sneaker
//POST add
//GET delete one sneaker

module.exports = router;
