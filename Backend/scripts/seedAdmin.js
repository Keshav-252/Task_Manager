import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "../models/User.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const existing = await User.findOne({ email: process.env.ADMIN_EMAIL });
    if (!existing) {
      const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      await User.create({ name: "Admin", email: process.env.ADMIN_EMAIL, password: hashed, role: "admin" });
      console.log("Admin user seeded");
    } else {
      console.log("Admin already exists");
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedAdmin();