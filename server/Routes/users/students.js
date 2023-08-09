import express from "express";
import { promisePool, pool } from "../../Data/db.js";

const studentRouter = express.Router();

studentRouter.get("/students/:teacherId", async (req, res) => {
  // console.log(pool);
  let teacherId = req.params.teacherId;
  console.log("return teacer id in params: ", teacherId);
  if (teacherId ) {
    // res.send(
    let [rows, fields] = await promisePool.query(
      `select * from students where teacherId = ${teacherId};`
    );
    console.log(`students with teacher id: ${teacherId}`, rows);
    // );
    res.send(rows);
  } else {
    console.log("this student doesnt exist");
  }
});

export default studentRouter;
