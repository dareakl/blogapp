import UserModel from "../models/user.js";
import bcrypt from "bcryptjs";

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
    const hashpassword = await bcrypt.hashSync(password, 10);
    const NewUser = new UserModel({
      fullname,
      email,
      password: hashpassword,
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

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields are required" });
    }
    const FindUser = await UserModel.findOne({ email });
    if (!FindUser) {
      return res
        .status(400)
        .json({ success: false, message: "No user found please register" });
    }
    const ComparePassword = await bcrypt.compare(password, FindUser.password);
    if (!ComparePassword) {
      return res
        .status(400)
        .json({ success: false, message: "Password not matched" });
    }
    res
      .status(200)
      .json({ success: true, message: "Login Successfully", user: FindUser });
  } catch (error) {}
};

export { Register, Login };
