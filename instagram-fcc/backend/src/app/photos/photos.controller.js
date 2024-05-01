const UserModel = require("../auth/user.model");
const PhotoModel = require("./photo.model");

class PhotosController {
  async getAllPhotos(req, res, next) {
    // const createdPhoto = await PhotoModel.create(req.body);
    // console.log(createdUser.fullName);
    res.status(400).json({
      user: req.user,
    });
  }

  async insertPhotos(req, res, next) {
    let createdPhoto;
    if (req.user) {
      createdPhoto = await PhotoModel.create({
        ...req.body,
       
      });
    }
    res.status(200).json({
      data: createdPhoto,
      msg: "photo posted successfully",
    });
  }

  async getPhotos(req, res, next) {
    const user = await UserModel.find({ _id: req.user._id });
    const { following,username } = user[0];
    console.log("following", following);
    PhotoModel.find({ userDocId: { $in: following } })
      .populate("likes")
      .populate("userDocId") // Use single quotes for consistency
      .limit(10)
      .sort({ _id: -1 }) // Sort by most recent (descending)
      .lean() // Improve performance for large datasets (optional)
      .then((photos) => {
        const photos_w_userLikedPhoto = photos.map((pic)=>{
          if(pic.likes?.username===username){
            return {...pic, userLikedPhoto:true, username:pic.likes?.username || ""}
          }else{
            return {...pic, userLikedPhoto:false,username:pic.likes?.username || ""}

          }
        })
        res.status(200).json({
          data: photos_w_userLikedPhoto,
          msg: "photo with userLikedPhoto and username populated successfully",
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

const photosCtrl = new PhotosController();
module.exports = photosCtrl;
