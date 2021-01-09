const express = require("express");
const mongoose = require("mongoose");
const jwt = require ('jsonwebtoken')
const User = mongoose.model("User");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();

    const token = jwt.sign({userId: user._id}, 'some_secret_key')
    res.send({token: token});
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

module.exports = router;
