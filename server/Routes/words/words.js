import express from "express";
import { faker } from "@faker-js/faker";
import { pool } from "../../Data/db.js";

const wordsRouter = express.Router();

wordsRouter.post("/:wordType", (req, res) => {


  let numOfWords = req.query.words || 10;
  let wordType = req.params.wordType;

  let wordsArray = [];

  for (let index = 0; index < numOfWords; index++) {
    const verb = faker.word.verb();
    const noun = faker.word.noun();

    switch (wordType) {
      case "verb":
        wordsArray.push([`('verb', '${verb}')`]);
        break;
      case "noun":
        wordsArray.push(`('noun', '${noun}')`);
        break;
      default:
        wordsArray.push(`('noun', '${noun}')`);
    }
  }


  const sql = `INSERT INTO words(word_type,word) VALUES
   ${wordsArray.map(
    (word) => word
  )} `;

  pool.query(sql, [], function (err, results) {
    if (err) throw err;
    console.log(results);
  });

  res.send(wordsArray);
});

wordsRouter.get("/teacherwords/:wordType", (req, res) => {
  console.log("arrived: ", req.query.words)

  let numOfWords = req.query.words || 10 ;
  let wordType = req.params.word_type;
  console.log("type:",wordType)
  let wordsArray = [];

  for (let index = 0; index < numOfWords; index++) {
    let word;
    switch (wordType) {
      case "verb":
        word = faker.word.verb();
        wordsArray.push(word);
        break;
      case "noun":
      default:
        word = faker.word.noun();
        wordsArray.push(word);
        break;
    
    }
  }
  res.send(wordsArray);
});

export default wordsRouter;
