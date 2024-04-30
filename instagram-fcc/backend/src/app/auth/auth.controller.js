const UserModel = require("./user.model");
const generateToken = require("./helpers");

class AuthController {
  async signUp(req, res, next) {
    const createdUser = await UserModel.create(req.body);
    console.log(createdUser.fullName);
    res.status(200).json(createdUser);
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    // "email": "akhada@gmail.com",
    //   "password":"1612$ten"
    const user = await UserModel.findOne({ email: "akhada@gmail.com" });
    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        username: user.username,
        pic: user.pic,
        token: generateToken(user._id),
        followers: user.followers,
        following: user.following,
        success: true,
      });
    } else {
      res.status(401);
      next({
        message: "invalid email or password",
      });
    }
  }

  async getSuggestedProfiles(req, res, next) {
    console.log(req.user._id);
    const user = await UserModel.find({ _id: req.user._id });
    const { following } = user[0];

    let result = [];
    result = await UserModel.find({
      _id: { $nin: [req.user._id, ...following] },
    }).limit(10);
    console.log("result", result);
    if (result) {
      res.status(200).json({
        data: result,
        msg: "suggested profiles fetched successfully",
      });
    }
  }

  async updateLoggedInUserFollowing(req, res, next) {
    console.log(req.body);
    const result = await UserModel.findOneAndUpdate(
      { _id: req.user._id },
      { $push: { following: req.body.profileDocId } },
      {
        new: true,
      }
    );
    console.log("updateLoggedInUserFollowing", result);

    if (result) {
      res.status(200).json({
        data: result,
        msg: "following array updated successfully",
      });
    }
  }

  async updateFollowedUserFollowers(req, res, next) {
    const result = await UserModel.findOneAndUpdate(
      { _id: req.body.profileDocId },
      { $push: { followers: req.user._id } },
      {
        new: true,
      }
    );
    if (result) {
      res.status(200).json({
        data: result,
        msg: "following array updated successfully",
      });
    }
  }
}

const authCtrl = new AuthController();
module.exports = authCtrl;
