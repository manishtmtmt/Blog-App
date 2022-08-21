require("dotenv").config();
const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;

const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const UserModel = require("../models/User.model");

const authRouter = Router();

const SALTROUND = process.env.SALTROUND;
authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const file = req.files.profile_pic;
  const existUser = await UserModel.findOne({ email });
  if (existUser) {
    return res.status(400).send({ message: "User already exists" });
  }
  bcrypt.hash(password, +SALTROUND, async function (err, hash) {
    if (err) return res.status(500).send({ message: "Something went wrong" });
    cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
      if (err)
        return res
          .status(500)
          .send({ message: "Something went wrong please try again later" });
      const user = new UserModel({
        name,
        profile_pic: result.url,
        email,
        password: hash,
      });
      await user.save();
      await unlinkFile(file.tempFilePath);
      return res.status(200).send({ message: "Signup successful" });
    });
  });
});

const JWT_SECRET = process.env.JWT_SECRET;
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) return res.status(404).send({ message: "Invalid Credentials" });
  bcrypt.compare(password, user.password, function (err, result) {
    if (err)
      return res.status(500).send({
        message: "Something went wrong, Please try again later",
        error: err,
      });
    if (!result)
      return res.status(400).send({ message: "Invalid Credentials" });
    else {
      const token = jwt.sign(
        {
          email,
          name: user.name,
        },
        JWT_SECRET,
        { expiresIn: "24h" }
      );
      return res
        .status(200)
        .send({ message: "Login Successful!", token, userId: user._id });
    }
  });
});

authRouter.patch("/forgetpassword", async (req, res) => {
  const { email, password } = req.body;
  const existUser = await UserModel.findOne({ email });
  if (!existUser)
    return res.status(400).send({ message: "Invalid Credential" });
  bcrypt.hash(password, +SALTROUND, async function (err, hash) {
    if (err) return res.status(500).send({ message: "Something went wrong" });
    await UserModel.findOneAndUpdate({ email }, { password: hash });
    return res.status(200).send({
      message: "You've successfully updated your password, Please login.",
    });
  });
});

module.exports = authRouter;
