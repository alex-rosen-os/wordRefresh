import express from "express";
import {pool} from "../../Data/db.js";

const studentsWordsRouter = express.Router();

studentsWordsRouter.post("/:teachersId", (req,res)=> {
    let teachersId = req.params.teachersId;
    
    console.log("body", req.body)
    console.log('student teacher id is:', teachersId );
    res.send(['hi'])
})
export default studentsWordsRouter;