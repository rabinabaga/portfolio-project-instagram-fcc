const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    pic: {
      type: "String",
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },

    password: String,
    status: {
      type: String,
      enum: ["inactive", "active", "other"],
      default: "inactive",
    },
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],

    token: String,
    forgetToken: String,
    validateTill: Date,
  },

  {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
  }
);

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
