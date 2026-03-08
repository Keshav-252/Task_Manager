import User from "../models/User.js";
import bcrypt from "bcrypt";
import { UserSchema, LoginSchema } from "../validator.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const signup = async (req, res, next) => {
    try {
    const validation = UserSchema.safeParse(req.body);

    if (!validation.success) {
    return res.status(400).json({
        msg: validation.error.issues[0].message
    });
    }

    const { name, email, password } = validation.data;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "This email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });
    res.status(200).json({ msg: "Congratulations!! Account has been created for you.." });
  }
  catch (err) {
    next(err);
  }
}

export const login = async (req, res, next) => {
   try {
    const validation = LoginSchema.safeParse(req.body);

    
    if (!validation.success) {
    return res.status(400).json({
        msg: validation.error.issues[0].message
    });
    }

    const { email, password } = validation.data;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ status: false, msg: "Email not registered" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ status: false, msg: "Password incorrect" });

  const token = jwt.sign({ userId: user._id, role: user.role}, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.status(200).json({ msg: "Login successful", token, name: user.name, email: user.email });
   }
  catch (err) {
    next(err);
  }
}

