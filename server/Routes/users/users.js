import express from "express";
import { promisePool, pool } from "../../Data/db.js";
import jwt from "jsonwebtoken";

const usersRouter = express.Router();

const secretKey = "secret";

usersRouter.get("/students/:id", async (req, res) => {
  let id = req.params.id;

  console.log("return teacer id in params: ", JSON.stringify(id));
  if (id) {
    let [rows, fields] = await promisePool.query(
      "select * from users where id = ? ",
      [id],
      (error, result) => {
        if (error) {
          throw error;
        }
        console.log(error, result);
      }
    );
    console.log(`students are: ${id}`, rows);
    res.send(rows);
  } else {
    console.log("this student doesnt exist");
  }
});


usersRouter.get("/teachers/:id", async (req, res) => {
  let id = req.params.id;

  console.log("id", id);

  let [rows, fields] = await promisePool.query(
    `SELECT * FROM users WHERE studentId is not null`
  );
  console.log("this users id is:", id);
  console.log("this rows :", rows);

  res.send(rows);
});

usersRouter.post("/login", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  console.log("username: ", username, "password", password);
  let [user, field] = await promisePool.query(
    "SELECT * FROM users WHERE username = ? AND pass = ?",
    [username, password]
  );
  console.log("row", user);

  if (!user?.length) {
    return res.status(401).json({ message: "invalid username or password" });
  }
  console.log("@", user[0].studentId);
  let userStudent = null;
  if (user[0].studentId) {
    /* get student if exist */
    console.log("has student");
    let [student, field] = await promisePool.query(
      `SELECT * FROM users WHERE id = ?`,
      [user[0].studentId]
    );
    console.log("student is: ", student);
    if (student.length) {
      userStudent = student[0];
    }
  }

  const token = jwt.sign(
    {
      id: user[0].id,
      username: user[0].username,
    },
    secretKey
  );
  console.log("t", token);
  res.json({
    id: user[0].id,
    students: [userStudent],
    token,
  });

  // console.log([username,password]);
});

// function authenticateToken(req, res, next) {
//   const token = req.header("authorization");
// console.log(token);
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

usersRouter.post("/protected", (req, res) => {
  console.log(JSON.stringify(req.headers));

  res.json({ message: "this route is protected", user: req.user });
});

export default usersRouter;
