const UserModel =  require("./user.model")

class AuthController {
  async signUp(req, res, next) {
    const createdUser = await UserModel.create(req.body);
    console.log(createdUser.fullName);
    res.status(400).json(createdUser);
  }
}

const authCtrl = new AuthController();
module.exports = authCtrl;
