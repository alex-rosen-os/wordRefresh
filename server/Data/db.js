import * as dotenv from "dotenv";
dotenv.config();



import mysql from "mysql2";


export const pool = mysql.createPool({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
});
export const promisePool = pool.promise()