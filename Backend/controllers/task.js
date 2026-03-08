import Task from "../models/Task.js";
import { validateObjectId } from "../validator.js";

export const getTasks = async (req, res, next) => {
  try {
    let tasks;
    // if(req.userRole === "admin") {
    //   tasks = await Task.find().populate("user", "name email");
    // }
    // else{
    tasks = await Task.find({ user: req.userId });
    //}
    return res.status(200).json({ tasks, status: true, msg: "Tasks found successfully.." });
  }
  catch (err) {
    next(err);
  }
}

export const getTask = async (req, res, next) => {
  try {
    if (!validateObjectId(req.params.taskId)) {
      return res.status(400).json({ status: false, msg: "Task id not valid" });
    }
    let task;
    // if(req.userRole === "admin") {
    //   task = await Task.findById(req.params.taskId).populate("user", "name email");
    // }
    // else {
    task = await Task.findOne({ user: req.userId, _id: req.params.taskId });
    //}
    if (!task) {
      return res.status(400).json({ status: false, msg: "No task found.." });
    }
    return res.status(200).json({ task, status: true, msg: "Task found successfully.." });
  }
  catch (err) {
    next(err);
  }
}

export const postTask = async (req, res, next) => {
  try {
    const { description } = req.body;
    if (!description) {
      return res.status(400).json({ status: false, msg: "Provide description of task" });
    }
    const task = await Task.create({ user: req.userId, description });
    res.status(200).json({ task, status: true, msg: "Task created successfully.." });
  }
  catch (err) {
    next(err);
  }
}

export const updateTask = async (req, res, next) => {
  try {

    if (!validateObjectId(req.params.taskId)) {
      return res.status(400).json({ status: false, msg: "Task id not valid" });
    }

    const { description } = req.body;
    if (!description) {
      return res.status(400).json({ status: false, msg: "Provide description of task" });
    }
    
    let task=await Task.findById(req.params.taskId);
    if(!task)
    {
      return res.status(400).json({ status: false, msg: "Task with given id not found" });
    }

    if(task.user.toString()!== req.userId) {
      return res.status(403).json({ status: false, msg: "You can't update this task" });
    }

    task = await Task.findByIdAndUpdate(req.params.taskId, { description }, { returnDocument: "after" });
    res.status(200).json({ task, status: true, msg: "Task updated successfully.." });
  }
  catch (err) {
    next(err);
  }
}


export const deleteTask = async (req, res, next) => {
  try {
    if (!validateObjectId(req.params.taskId)) {
      return res.status(400).json({ status: false, msg: "Task id not valid" });
    }

    let task = await Task.findById(req.params.taskId);

    if (!task) {
    return res.status(404).json({ msg: "Task not found" });
    }

    if (task.user.toString() !== req.userId) {
     return res.status(403).json({ msg: "Not authorized" });
    }

    await Task.findByIdAndDelete(req.params.taskId);
    return res.status(200).json({ status: true, msg: "Task deleted successfully.." });
  }
  catch (err) {
   next(err);
  }
}