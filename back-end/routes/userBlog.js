const { Router } = require("express");

const BlogModel = require("../models/Blog.model");

const userBlog = Router();

userBlog.get("/:blogId", async (req, res) => {
  const { blogId } = req.params;
  const blog = await BlogModel.findOne({ _id: blogId }, { userId: 0, __v: 0 });
  if (!blog) return res.status(404).send({ message: "Blog not found" });
  return res.status(200).send(blog);
});

module.exports = userBlog;
