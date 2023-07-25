
import express from "express";
import { promisePool, pool } from "../../Data/db.js";
import jwt from "jsonwebtoken";

const teacherRouter = express.Router();

const secretKey = "secret";


teacherRouter.get("/teachers", async (req, res) => {
  // let teachersArray = [];

  let firstname = req.query.firstname;

  console.log(firstname);
  // let teachers;
  // if (firstname === "leo") {
    console.log("wow", "SELECT * FROM teachers where username = " + `'${firstname}'`)
      let [rows, fields] = await promisePool.query(`SELECT * FROM teachers where username = '${firstname}'`)
    // teachersArray.push(firstname);
    console.log("this teachers first name is:", firstname);
    console.log("this rows :", rows);
    // console.log("this fields :", fields);
  // } else {
  //   console.log("this teacher doesn't exist");
  // }
  res.send(rows[0])
 
});

// teacherRouter.get("/teacher/login", (req, res) => {
//   try{
//   res.send("<h1>this is a teacher route</h1>")
//   } catch (err){
//     console.log(err);
//   }
// });

function authenticateToken(req, res, next) {
  const token = req.header("authorization");
  if (!token) {
    return res
      .status(401)
      .json({ message: "unaauthorized: no token provided" });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "forbidden: invalid token" });
    }
    req.user = user;
    next();
  });
}


teacherRouter.post("/teacher/login", (req, res) => {
  connection.query(
    "SELECT id, username, pass FROM teachers WHERE username = 'leo' AND pass ='12345' ",
    [username, password],
    
    (err, results) => {
      if (err || results.length === 0) {
        return res
          .status(401)
          .json({ message: "invalid username or password" });
      }
      const user = results[0];
      const token = jwt.sign({id:user.id, username:user.username},secretKey);
      res.json({token})
    }
  )
  console.log([username,password]);
});

teacherRouter.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "this route is protected", user:req.user });
});


export default teacherRouter;
