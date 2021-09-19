const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection( {
        host: 'localhost',
        user: 'root',
        password: process.env.DB_PASS,
        database: 'employees',
        dialect: 'mysql',
        port: 3306
});

connection.connect((err) => {
    if (err) throw err;
});

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: 'localhost',
//     dialect: 'mysql',
//     port: 3306
//   }
// );

// module.exports = sequelize;
module.exports = connection;