import express from "express";

const router = express.Router();

router.get("/health", (req, res) => {
  return res.json({ message: "All well" });
});

module.exports = router;
