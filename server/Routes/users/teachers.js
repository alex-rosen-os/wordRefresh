
import express from "express";
import { promisePool, pool } from "../../Data/db.js";
import jwt from "jsonwebtoken";

const teacherRouter = express.Router();

const secretKey = "secret";

teacherRouter.get("/teachers", async (req, res) => {

  let firstname = req.query.firstname;

  console.log(firstname);

    console.log("wow", "SELECT * FROM teachers where username = " + `'${firstname}'`)
      let [rows, fields] = await promisePool.query(`SELECT * FROM teachers where username = '${firstname}'`)
    console.log("this teachers first name is:", firstname);
    console.log("this rows :", rows);
  
  res.send(rows[0])
 
});

teacherRouter.post("/login",async (req, res) => {
  let username = req.body.username
  let password = req.body.password
  console.log("username: ", username, password)
  let [rows,field] = await promisePool.query(
    "SELECT * FROM teachers WHERE username = ? AND pass = ?",
    [username, password])
    console.log("row", rows)
    // (err, results) => {
    //   console.log("results", results)
      if (!rows?.length) {
        return res
          .status(401)
          .json({ message: "invalid username or password" });
      }
      // const user = results[0];
      const token = jwt.sign({id:rows[0].id, username:rows[0].username},secretKey);
      console.log("t", token)
      res.json({id: rows[0].studentId, token})
  //   }
  // )
  console.log([username,password]);
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


teacherRouter.post("/protected", (req, res) => {
  console.log(JSON.stringify(req.headers));

  res.json({ message: "this route is protected", user:req.user });
});


export default teacherRouter;
