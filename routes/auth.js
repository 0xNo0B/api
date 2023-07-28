import express from "express";

const router = express.Router();
router.get("/", (req, res) => {
  const message = { Message: "this is for authentication" };
  res.status(200).json(message);
});

router.get("/register", (req, res) => {
  res.send(`this is register`);
});

export default router;
