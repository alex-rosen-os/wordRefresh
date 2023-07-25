import express from "express";
import { promisePool, pool } from "../../Data/db.js";

const studentRouter = express.Router();

studentRouter.get("/students/:studentId", async (req, res) => {
  // console.log(pool);
  let studentId = req.params.studentId;
  console.log("123", studentId);
  if (studentId === "1") {
    // res.send(
      let [rows, fields] = await promisePool.query("SELECT * FROM students")
      console.log("yay", rows)
    // );
    res.send(rows)
  } else {
    console.log("this student doesnt exist");
  }

});

// studentRouter.post("/student", (req, res) => {
//   res.send("<h1>this is a student</h1>");
// });

export default studentRouter;
