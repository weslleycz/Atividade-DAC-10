import express, { Request, Response } from "express";
import fs from "fs";

const app = express();

type User = {
  name: string;
  email: string;
  password: string;
};

app.use(express.json({ limit: "200mb" }));

app.post("/", async (req: Request, res: Response) => {
  const { email, name, password } = <User>req.body;
  try {
    const data = `Nome,Email,Password`;
    fs.writeFileSync("data.csv", `${data}\n ${name},${email},${password}`);
    return res.status(200).json({ status: "created" });
  } catch (error) {
    return res.status(400).json(error);
  }
});

app.listen(3000);
