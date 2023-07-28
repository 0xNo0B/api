import express from "express";

const router = express.Router();
router.get("/", (req, res) => {
  const message = {
    Message: "Can not send GET to root file.",
    status: 203,
    authentication: false,
  };
  res.status(200).json(message);
});

export default router;
