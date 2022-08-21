require("dotenv").config();
const { Router } = require("express");
const cloudinary = require("cloudinary").v2;
const moment = require("moment");

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
const BlogModel = require("../models/Blog.model");

const appRouter = Router();

appRouter.post("/create/:userId", async (req, res) => {
  const { userId } = req.params;
  const file = req.files.blog_img;
  const { title, category, description } = req.body;
  const user = await UserModel.findOne({ _id: userId });
  if (!user) return res.status(404).send({ message: "User is not found!" });
  const author = user.name;
  const author_profile_pic = user.profile_pic;
  let date = moment().format("DD/MM/YYYY");
  cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
    if (err)
      return res
        .status(500)
        .send({ message: "Something went wrong, Please try again" });
    const newBlog = new BlogModel({
      userId,
      title,
      description,
      image_url: result.url,
      category,
      author,
      author_profile_pic,
      date,
    });
    await newBlog.save();
    await unlinkFile(file.tempFilePath);
    res.status(200).send({ message: "Blog has been posted successfully" });
  });
});

appRouter.patch("/:blogId", async (req, res) => {
  const { blogId } = req.params;
  const file = req.files.blog_img;
  const { title, description, category } = req.body;
  const blog = await BlogModel.findOne({ _id: blogId });
  if (!blog) return res.status(404).send({ message: "Blog not found" });
  cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
    if (err)
      return res
        .status(500)
        .send({ message: "Something went wrong, Please try again" });
    await BlogModel.findByIdAndUpdate(
      { _id: blogId },
      { title, description, category, image_url: result.url }
    );
    await unlinkFile(file.tempFilePath);
    return res
      .status(200)
      .send({ message: "Blog has been updated successfully" });
  });
});

appRouter.delete("/:blogId", async (req, res) => {
  const { blogId } = req.params;
  try {
    await BlogModel.findByIdAndDelete({ _id: blogId });
    return res
      .status(200)
      .send({ message: "Blog has been deleted successfully" });
  } catch (error) {
    return res.status(404).send({ message: "Blog not found" });
  }
});

module.exports = appRouter;
