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
}

const authCtrl = new AuthController();
module.exports = authCtrl;
