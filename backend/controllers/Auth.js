import UserModel from "../models/user.js";

const Register = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    const existUser = await UserModel.find({ email });
    if (!existUser) {
      return res
        .status(303)
        .json({ success: false, message: "User already Exist Please Login" });
    }
    const imagePath = req.file.filename;
    const NewUser = new UserModel({
      fullname,
      email,
      password,
      profile: imagePath,
    });

    await NewUser.save();
    return res.status(200).json({
      success: true,
      message: "User Register Successfully",
      user: NewUser,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server error" });
  }
};

export { Register };
