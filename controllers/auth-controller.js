import User from "../models/user.js";
import bcrypt from "bcrypt";
const registerUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;


    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email address already exists" });
    }



    const salt = await bcrypt.gensalt(10)
    const hashPassword = await bcrypt.hash(password, salt);



    
    const newUser = await User.create({email , password:hashPassword , name  });

    res.status(201).json({ message: "Verification email sent to your email PLease check and verify your account ", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { registerUser, loginUser };
