const router = require("express").Router();

const authRoutes = require("../app/auth/auth.router.js");

router.use("/auth", authRoutes);
module.exports = router;
