const express = require("express");
const router = express.Router();
const Sneaker = require("../models/Sneaker");
const bcrypt = require("bcrypt");


router.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email: email });
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
    const foundUser = await User.findOne({ email: newUser.email });
    if (foundUser) {
      req.flash("warning", "email already registered");
      res.redirect("/signup");
    } else {
      const hashedPassword = bcrypt.hashSync(newUser.password, 10);
      newUser.password = hashedPassword;
      await User.create(newUser);
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
