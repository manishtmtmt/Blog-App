const { model, Schema } = require("mongoose");

const BlogSchema = new Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  image_url: { type: String },
  description: { type: String, required: true },
  category: { type: String },
  author: { type: String, required: true },
  author_profile_pic: String,
  date: String,
});

const BlogModel = model("blog", BlogSchema);

module.exports = BlogModel;
