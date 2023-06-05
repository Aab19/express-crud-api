import express from "express";
import {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controller/UserController.js";
import { validateCreateOrEditUser } from "../utils/index.js";
const userRouter = express.Router();

userRouter.get("/", getAllUser);
userRouter.get("/:id", getUserById);
userRouter.post("/", validateCreateOrEditUser(), createUser);
userRouter.put("/:id", validateCreateOrEditUser(), updateUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;
