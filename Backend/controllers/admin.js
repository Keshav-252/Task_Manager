import User from "../models/User.js";
import Task from "../models/Task.js";
import { validateObjectId } from "../validator.js";


export const listUsers = async (req, res, next) => {
try {
  const users = await User.find().select("-password");
  res.status(200).json({ users, status: true });
} catch (err) {
  next(err);
}
};

export const updateUserRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!validateObjectId(id)) return res.status(400).json({ msg: "Invalid user id" });
    if (!["user", "admin"].includes(role)) return res.status(400).json({ msg: "Invalid role" });

    const user = await User.findByIdAndUpdate(id, { role }, { returnDocument: "after" }).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.status(200).json({ user, status: true });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Prevent deleting admins
    if (user.role === "admin") {
      return res.status(403).json({ msg: "Admins cannot be deleted" });
    }

    await User.findByIdAndDelete(id);
    await Task.deleteMany({ user: id });

    res.status(200).json({
      msg: "User and tasks deleted",
      status: true
    });

  } catch (err) {
    next(err);
  }
};