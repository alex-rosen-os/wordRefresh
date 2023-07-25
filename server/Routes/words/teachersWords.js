import express from "express";
import { faker } from "@faker-js/faker";
import { pool } from "../../Data/db.js";

const teachersWordsRouter = express.Router();

teachersWordsRouter.post("/:wordType", (req, res) => {
  // console.log("query: ", req.query.techers_words)
  // console.log("param: ", req.params.wordType)

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

  // console.log(wordsArray)

  const sql = `INSERT INTO words(word_type,word) VALUES
   ${wordsArray.map(
    (word) => word
  )} `;
  // console.log("sql" , sql)

  pool.query(sql, [], function (err, results) {
    if (err) throw err;
    console.log(results);
  });

  res.send(wordsArray);
});

teachersWordsRouter.get("/teacherwords/:wordType", (req, res) => {
  console.log("arrived: ", req.query.words)
  // console.log("param: ", req.params.wordType)

  let numOfWords = req.query.words || 10 ;
  let wordType = req.params.word_type;
  console.log("type:",wordType)
  let wordsArray = [];

  for (let index = 0; index < numOfWords; index++) {
    let word;
    switch (wordType) {
      case "verb":
        word = faker.word.verb();
        // console.log("w", word)
        wordsArray.push(word);
        break;
      case "noun":
      default:
        word = faker.word.noun();
        wordsArray.push(word);
        break;
      // word = faker.word.noun();
      // wordsArray.push(word);
    }
  }
  res.send(wordsArray);
});

export default teachersWordsRouter;
