const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
  name: { type: String, required: true },
  profile_pic: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const UserModel = model("user", UserSchema);

module.exports = UserModel;
