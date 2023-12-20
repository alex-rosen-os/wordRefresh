import express from "express";
import { faker } from "@faker-js/faker";
import { promisePool, pool } from "../../Data/db.js";

const wordsRouter = express.Router();

wordsRouter.get("/:wordType", (req, res) => {
  let numOfWords = req.query.words || 10;
  let wordType = req.params.wordType;

  let wordsArray = [];

  for (let index = 0; index < numOfWords; index++) {
    const verb = faker.word.verb();
    const noun = faker.word.noun();

    switch (wordType) {
      case "verb":
        wordsArray.push(`('verb', '${verb}')`);
        break;
      case "noun":
        wordsArray.push(`('noun', '${noun}')`);
        break;
      default:
        wordsArray.push(`('noun', '${noun}')`);
    }
  }
  //ALTER TABLE words MODIFY id int NOT NULL AUTO_INCREMENT;
  // const sql = `INSERT INTO words(word_type,word) VALUES ${wordsArray.map(
  //   (word) => word
  // )} `;

  // pool.query(sql, [], function (err, results) {
  //   if (err) throw err;
  //   console.log(results);
  // });

  res.send(wordsArray);
});

wordsRouter.get("/:id", async (req, res) => {
  let word = req.params.word;
  let wordType = req.params.wordType;
  let id = req.params.id;
  if (id) {
    try {
      let [rows, fields] = await promisePool.query(
        "select * from words WHERE id = ?",
        [id, word, wordType]
      );
      res.send(rows);
    } catch (error) {
      console.error(error);
      res.status(500).send("error retriving word by ID");
    }
  } else {
    res.status(400).send("invalid ID parameter");
  }
});

wordsRouter.post("/checked", async (req, res) => { 
console.log(req.body);
  let checked = req.body.data

  // let wordsArray = [];
  if (checked.length > 0) {
    // [{ word, wordType, userId }]
    // (word, wordType, userId )
    let valuesQuery = checked.map((wordObject) => 
      `("${wordObject.word}", "${wordObject.wordType}", ${wordObject.userId})`);
    const sql = `INSERT INTO words (word,word_type,userId) VALUES ${valuesQuery}`;
    pool.query(
      sql,
      // [wordsArray.map((word) => [word])],
      [],
      function (err, results) {
        if (err) {
          console.error(err);
          res.status(500).send("error inserting words");
        } else {
          console.log("results", results);
          res.status;
        }
      }
    );
  }
  res.send([]);
});

wordsRouter.get("/teacherwords/:wordType", (req, res) => {
  console.log("arrived: ", req.query.words);

  let numOfWords = req.query.words || 100;
  let wordType = req.params.word_type;
  console.log("type:", wordType);
  let wordsArray = [];
  let idCounter = [];

  for (let index = 0; index < numOfWords; index++) {
    let word;
    switch (wordType) {
      case "verb":
        word = faker.word.verb();
        wordsArray.push([word]);
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

wordsRouter.get("/users/:userId", async (req, res) => {
  try {
    let userId = req.params.userId;
    if (userId) {
      let [rows, fields] = await promisePool.query(
        "select * from words WHERE userId = ? ",
        [userId]
      );
      console.log(`users words are: ${userId}`, rows);
      res.send(rows);
    } else {
      console.log("this user has no words");
    }
  } catch (error) {
    console.error("error fetching users words", error);
  }
});

export default wordsRouter;
