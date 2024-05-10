const UserModel = require("../auth/user.model");
const { PhotoModel } = require("./photo.model");
const { LikeModel } = require("./photo.model");

class PhotosController {
  async getAllPhotos(req, res, next) {
  
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
    const { following, username } = user[0];
    PhotoModel.find({ userDocId: { $in: following } })
      .populate("likes")
      .populate("userDocId") // Use single quotes for consistency
      .limit(10)
      .sort({ _id: -1 }) // Sort by most recent (descending)
      .lean() // Improve performance for large datasets (optional)
      .then((photos) => {
        const photos_w_userLikedPhoto = photos.map((pic) => {
          if (pic.likes.some((like) => like.username === username)) {
            return {
              ...pic,
              userLikedPhoto: true,
              username: pic.userDocId.username || "",
            };
          } else {
            return {
              ...pic,
              userLikedPhoto: false,
              username: pic.userDocId.username || "",
            };
          }
        });
        res.status(200).json({
          data: photos_w_userLikedPhoto,
          msg: "photo with userLikedPhoto and username populated successfully",
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }
  async updatePhoto(req, res, next) {
    let result = {};
    //get the objectid of the likes where the username is sent one from the frontend
    try {
      if (!req.body.toggleUser) {
        try {
          const likeObject = await LikeModel.find({
            username: req.body.username,
          });
          const { _id } = likeObject[0];
          result = await PhotoModel.findOneAndUpdate(
            { _id: req.body.docId },
            { $pull: { likes: _id } },
            {
              new: true,
            }
          );

          await LikeModel.deleteMany({ username: req.body.username });
          res.status(200).json({
            data: result,
            msg: "photo updated  successfully",
          });
        } catch (error) {
          next({
            data: error,
            msg: "liking photo failed",
          });
        }
      } else {
        try {
          const likedObject = await LikeModel.create({
            username: req.body.username,
          });

          result = await PhotoModel.findOneAndUpdate(
            { _id: req.body.docId },
            { $push: { likes: likedObject._id } },
            {
              new: true,
            }
          ).populate("userDocId","-password")
         result = await UserModel.populate(result,{
          path:"likes",
          populate:{
            path:"username",
            select:"username"
          }
         })
          res.status(200).json({
            data: result,
            msg: "photo updated  successfully",
          });
        } catch (error) {
          next({
            data: error,
            msg: "liking photo failed",
          });
        }
      }
    } catch (error) {
      console.error("Error updating document:", error);
    }
  }
}

const photosCtrl = new PhotosController();
module.exports = photosCtrl;
