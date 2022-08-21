const { Router } = require("express");

const BlogModel = require("../models/Blog.model");

const blogsRouter = Router();

blogsRouter.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  const blogs = await BlogModel.find({ userId }, { userId: 0, __v: 0 });
  if (blogs.length === 0)
    return res.status(404).send({ message: "User not found" });
  return res.status(200).send(blogs);
});

blogsRouter.get("/", async (req, res) => {
  const blogs = await BlogModel.find();
  return res.status(200).send(blogs);
});

module.exports = blogsRouter;
