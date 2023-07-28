import express from "express";
import User from "../models/user.js";
import { createError } from "../utils/error.js";
import {
  createUser,
  deleteAllUser,
  deleteUser,
  getAllUser,
  getUser,
  updateUser,
} from "../controllers/userControllers.js";

const router = express.Router();
//create
router.post("/", createUser);

//update
router.put("/:id", updateUser);

//delete
router.delete("/:id", deleteUser);

//deleteAll
router.delete("/", deleteAllUser);

//get
router.get("/:id", getUser);
//get all
router.get("/", getAllUser);
export default router;
