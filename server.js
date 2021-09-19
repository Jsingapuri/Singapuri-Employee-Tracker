const inquirer = require("inquirer");
const connection = require("./config/connection");
const mysql = require("mysql2");
const Sequelize = require('sequelize');

require("dotenv").config();
require("console.table");

const askQuestion = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "pick",
        message: "What do you want to do?",
        choices: [
          "viewEmployees",
          "viewDepartments",
          "viewRoles",
          "addDepartment",
          "addRole",
          "addEmployee",
          "updateEmployeeRole",
          "quit",
        ],
      },
    ])
    .then((answers) => {
      switch (answers.pick) {
        case "viewEmployees":
          viewEmployees();
          break;
        case "viewDepartments":
          viewDepartments();
          break;
        case "viewRoles":
          viewRoles();
          break;
        case "addDepartment":
          addDepartment();
          break;
        case "addRole":
          addRole();
          break;
        case "addEmployee":
          addEmployee();
          break;
        case "updateEmployeeRole":
          updateEmployeeRole();
          break;
        case "quit":
          quit();
          break;
        default:
          break;
      }
    });
};

const viewEmployees = () => {
  connection.query(`SELECT * FROM employee`, (err, results) => {
    if (err) throw err;

    console.table(results);
    askQuestion();
  });
};

const viewDepartments = () => {
  connection.query(`SELECT * FROM department`, (err, results) => {
    if (err) throw err;

    console.table(results);
    askQuestion();
  });
};

const viewRoles = () => {
  connection.query(`SELECT * FROM role`, (err, results) => {
    if (err) throw err;

    console.table(results);
    askQuestion();
  });
};


const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the department?",
      },
    ])
    .then((answers) => {
      connection.query(
        `INSERT INTO department SET ?`,
        [answers],
        (err, results) => {
          //   if (err) throw err;

          console.table(results);
          askQuestion();
        }
      );
    });
};

const addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the role's title?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the role's salary?",
      },
      {
        type: "input",
        name: "department_id",
        message: "What department does the role belong to?",
      },
    ])
    .then((answers) => {
      connection.query(
        `INSERT INTO role SET ?`, 
        [answers], 
        (err, results) => {
        //   if (err) throw err;

        console.table(results);
        askQuestion();
      });
    });
};
// employee issues
const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "first_name?",
      },
      {
        type: "input",
        name: "last_name",
        message: "last_name?",
      },
      {
        type: "input",
        name: "role_id",
        message: "role_id?",
      },
      {
        type: "input",
        name: "manager_id",
        message: "manager_id?",
      },
    ])
    .then((answers) => {
      connection.query(
        `INSERT INTO employee SET ?`,
        [answers],
        (err, results) => {
          //   if (err) throw err;

          console.table(results);
          askQuestion();
        }
      );
    });
};

const updateEmployeeRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "role_id",
        message: "role_id?",
      },
      {
        type: "input",
        name: "employee_id",
        message: "employee_id?",
      },
    ])
    .then((answers) => {
      connection.query(
        `UPDATE employee SET role_id = ? WHERE id = ?`,
        [answers.role_id, answers.employee_id],
        (err, results) => {
          if (err) throw err;

          console.table(results);
          askQuestion();
        }
      );
    });
};



const quit = () => process.exit();
  

askQuestion();


