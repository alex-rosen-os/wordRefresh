import dotenv from "dotenv";
import express from "express"; 
import { json } from "express";
import bodyParser from "body-parser";
import cors from "cors";

import wordsRouter from "./Routes/words/words.js";
import usersRouter from "./Routes/users/users.js";
import authenticateToken from './middlewares/auth.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
console.log("port :", PORT);


app.use(
  cors({
    origin: "*",
  })
);

app.use(express.static("public"));
app.use(bodyParser.json());

 

app.use("/words", wordsRouter);
app.use("/users", usersRouter);

app.use(json());

app.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "this route is protected", user:req.user });
});



app.listen(PORT, () => console.log(`server runing on ${PORT}`));
