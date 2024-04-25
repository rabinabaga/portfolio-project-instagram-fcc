const router = require("express").Router();
const UserModel = require("../models/user.model");

router.get("/", async (req, res) => {
  const user = new UserModel({
    username: "akhada",
    email: "akhada@gmail.com",
    fullName: "Akhada Kurauda",
  });
  const savedUser = await user.save();
  res.send("Hello world " + savedUser.username);
});

module.exports = router;
