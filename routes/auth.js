const express = require("express");
const router = express.Router();
const Sneaker = require("../models/Sneaker");
const bcrypt = require("bcrypt");
const UserModel = require("./../models/User")

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.get("/logout", (req, res) => {
  req.session.destroy(function (err) {
    res.redirect("signin");
  });
});

router.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;
  const foundUser = await UserModel.findOne({ email: email });
  console.log("foundUser1 =", foundUser);
  if (!foundUser) {
    req.flash("error", "Invalid Credentials");
    res.redirect("/signin");
  } else {
    const isSamePassword = bcrypt.compareSync(password, foundUser.password);
    if (!isSamePassword) {
      req.flash("error", "Invalid Credentials");
      res.redirect("/signin");
    } else {
      const userObject = foundUser.toObject();
      delete userObject.password;
      req.session.currentUser = userObject;
      req.flash("Success", "Wouhou Success!");
      res.redirect("/products_manage");
    }
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const newUser = { ...req.body };
    const foundUser = await UserModel.findOne({ email: newUser.email });
    console.log("foundUser = ", foundUser)
    if (foundUser) {
      console.log("user exists")
      req.flash("warning", "email already registered");
      res.redirect("/signup");
    } else {
      console.log("EH OH")
      const hashedPassword = bcrypt.hashSync(newUser.password, 10);
      newUser.password = hashedPassword;
      await UserModel.create(newUser);
      req.flash("success", "congrats! You are registered");
      res.redirect("/signin");
    }
  } catch (err) {
    var errorMsg = "";
    for (field in err.errors) {
      errorMsg += err.errors[field].message + "\n";
    }
    req.flash("error", errorMsg);
    res.redirect("/signup");
  }
});

module.exports = router;
