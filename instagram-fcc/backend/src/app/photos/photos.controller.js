// const PhotoModel = require("./photos.model");

class PhotosController {
  async getAllPhotos(req, res, next) {
    // const createdPhoto = await PhotoModel.create(req.body);
    // console.log(createdUser.fullName);
    res.status(400).json({
      user:req.user
    });
  }
}

const photosCtrl = new PhotosController();
module.exports = photosCtrl;
