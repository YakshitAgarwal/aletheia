import express, { Request, Response } from "express";

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use("/", require("./app"));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Express + TypeScript backend is running!",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
