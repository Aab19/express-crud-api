import express from "express";
const router = express.Router();
import userRouter from "./user.js";

router.get("/", (req, res) => {
  res.send("Express Crud API");
});

router.use("/user", userRouter);

export default router;
