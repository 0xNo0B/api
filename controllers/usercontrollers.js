import user from "../models/user.js";
import { createError } from "../utils/error.js";

export const createUser = async (req, res, nex) => {
  const newUser = new user({
    name: req.body.name,
    usage: req.body.usage,
  });
  const { usage, name } = newUser;
  if (!usage || !name)
    return res.status(400).json({ message: "Check your request parameter" });
  try {
    const savedUser = await newUser.save();
    res
      .status(200)
      .json({ message: "user has been created", ...savedUser._doc });
  } catch (err) {
    res
      .status(400)
      .json({ message: "can not create new user", statuscode: 400 });
  }
};
export const updateUser = async (req, res, next) => {
  const newUser = req.body.name;
  const oldUser = await user.findById(req.params.id);
  if (newUser === oldUser.name)
    return res.status(400).json({
      message: "user name must be different then old one",
      status: 400,
    });
  try {
    const updateUser = await user.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const deleteUser = async (req, res, nex) => {
  const getCurrent = await user.findById(req.params.id);
  if (!getCurrent)
    return res.status(400).json({ message: "no user found!", status: 400 });
  try {
    const deletedUser = await user.findByIdAndDelete(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    const deleted = {
      message: `user ${getCurrent.name} been deleted`,
      ...deletedUser._doc,
    };
    res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const getUser = async (req, res, nex) => {
  try {
    const getUsers = await user.findById(req.params.id);
    res.status(200).json(getUsers);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const getAllUser = async (req, res, nex) => {
  try {
    const Users = await user.find();
    res.status(200).json(Users);
  } catch (err) {
    next(err);
  }
};
export const deleteAllUser = async (req, res, nex) => {
  try {
    const deletedUser = await user.deleteMany();
    const deleted = { message: "user has been deleted", ...deletedUser._doc };
    res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json(err);
  }
};
