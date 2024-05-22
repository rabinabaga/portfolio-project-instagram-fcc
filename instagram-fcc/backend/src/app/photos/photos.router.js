const router = require("express").Router();
const photosCtrl = require("./photos.controller");
const checkAuthentication = require("../../middlewares/auth.middleware");
const upload = require("../../upload");

router.post("/insert-photos",upload.single("imageSrc"), checkAuthentication, photosCtrl.insertPhotos);

router.get("/get-photos", checkAuthentication, photosCtrl.getPhotos);

router.post("/update-photo", checkAuthentication, photosCtrl.updatePhoto);

module.exports = router;
