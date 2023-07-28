import dotenv from "dotenv";
import express from "express";
import { json } from "express";
import bodyParser from "body-parser";
import cors from "cors";

import teachersWordsRouter from "./Routes/words/teachersWords.js";
import studentsWordsRouter from "./Routes/words/studentsWords.js";
import teacherRouter from "./Routes/users/teachers.js";
import studentRouter from "./Routes/users/students.js";
import authenticateToken from './middlewares/auth.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
console.log("port :", PORT);


app.use(
  cors({
    origin: "*",
  })
);

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use("/words", studentsWordsRouter);
app.use("/words", teachersWordsRouter);
app.use("/users", teacherRouter);
app.use("/users", studentRouter);

app.use(json());

app.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "this route is protected", user:req.user });
});


// app.get("/", (req, res) => {
//   res.send("<h1>hello world</h1>");
// });
// app.get("/users", (req, res) => {
//   res.send("<h1>users</h1>");
// });



app.listen(PORT, () => console.log(`server runing on ${PORT}`));
