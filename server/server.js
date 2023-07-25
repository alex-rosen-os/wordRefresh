import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { json } from "express";
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

import teachersWordsRouter from "./Routes/words/teachersWords.js";
import studentsWordsRouter from "./Routes/words/studentsWords.js";
import teacherRouter from "./Routes/users/teachers.js";
import studentRouter from "./Routes/users/students.js";
import authRouter from "./Routes/users/authentication.js";

app.use("/words", studentsWordsRouter);
app.use("/words", teachersWordsRouter);
app.use("/users", teacherRouter);
app.use("/users", studentRouter);
app.use("/users", authRouter);

app.use(json());

// function authenticateToken(req, res, next) {
//   const token = req.header("authorization");
//   if (!token) {
//     return res
//       .status(401)
//       .json({ message: "unaauthorized: no token provided" });
//   }

//   jwt.verify(token, secretKey, (err, user) => {
//     if (err) {
//       return res.status(403).json({ message: "forbidden: invalid token" });
//     }
//     req.user = user;
//     next();
//   });
// }


// app.post("/login", (req, res) => {
//   connection.query(
//     "SELECT id, username, pass FROM teachers WHERE = ? AND pass =?",
//     [username, password],
//     (err, results) => {
//       if (err || results.length === 0) {
//         return res
//           .status(401)
//           .json({ message: "invalid username or password" });
//       }
//       const user = result[0];
//       const token = jwt.sign({id:user.id, username:user.username},secretKey);
//       res.json({token})
//     }
//   );
// });

// app.get("/protected", authenticateToken, (req, res) => {
//   res.json({ message: "this route is protected", user:req.user });
// });

app.get("/", (req, res) => {
  res.send("<h1>hello world</h1>");
});
app.get("/users", (req, res) => {
  res.send("<h1>users</h1>");
});



app.listen(PORT, () => console.log(`server runing on ${PORT}`));
