const router = require("express").Router();
const photosCtrl = require("./photos.controller");
const checkAuthentication = require("../../middlewares/auth.middleware")

router.get("/",checkAuthentication, photosCtrl.getAllPhotos);

module.exports = router;
