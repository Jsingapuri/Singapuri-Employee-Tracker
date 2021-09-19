const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASS,
  database: "employees",
  port: 3306,
});

connection.connect((err) => {
  if (err) throw err;
});


module.exports = connection;
