import PostModel from "../models/blog.js";

const Create = async (req, res) => {
  try {
    const { title, description } = req.body;
    const imagePath = req.file.filename;
    const CreateBlog = new PostModel({
      title,
      description,
      image: imagePath,
    });
    await CreateBlog.save();
    return res.status(200).json({
      success: true,
      message: "Post Created Successfully",
      post: CreateBlog,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server error" });
  }
};

export { Create };
