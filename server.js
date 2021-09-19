const inquirer = require("inquirer");
const connection = require("./config/connection");
const mysql = require("mysql2");
const Sequelize = require("sequelize");

require("dotenv").config();
require("console.table");
//the iniitial prompt with selectable options
const askQuestion = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "pick",
        message: "What do you want to do?",
        choices: [
          "viewEmployees",
          "viewEmployeesByManager",
          "viewDepartments",
          "viewRoles",
          "addDepartment",
          "addRole",
          "addEmployee",
          "updateEmployeeRole",
          "updateEmployeeManager",
          "quit",
        ],
      },
    ])
    .then((answers) => {
      switch (answers.pick) {
        case "viewEmployees":
          viewEmployees();
          break;
        case "viewEmployeesByManager":
          viewEmployeesByManager();
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
        case "updateEmployeeManager":
          updateEmployeeManager();
          break;
        case "quit":
          quit();
          break;
        default:
          break;
      }
    });
};
// generates a table showing all employees
const viewEmployees = () => {
  connection.query(`SELECT * FROM employee`, (err, results) => {
    if (err) throw err;

    console.table(results);
    askQuestion();
  });
};

// generates a table showing all employees by manager id
const viewEmployeesByManager = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "manager_id",
        message: "What is the id # for the manager you want to see?",
      },
    ])
    .then((answers) => {
      connection.query(
        `SELECT * FROM employee WHERE manager_id = ?`,
        [answers.manager_id],
        (err, results) => {
          if (err) throw err;

          console.table(results);
          askQuestion();
        }
      );
    });
};

// generates a table showing all departments
const viewDepartments = () => {
  connection.query(`SELECT * FROM department`, (err, results) => {
    if (err) throw err;

    console.table(results);
    askQuestion();
  });
};
// generates a table showing all roles
const viewRoles = () => {
  connection.query(`SELECT * FROM role`, (err, results) => {
    if (err) throw err;

    console.table(results);
    askQuestion();
  });
};

//prompt that takes in the user input to create the desired department and adds it to
//list of other departments
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
//prompt that takes in the user input to create the desired role and adds it to
//list of other roles
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
      connection.query(`INSERT INTO role SET ?`, [answers], (err, results) => {
        //   if (err) throw err;

        console.table(results);
        askQuestion();
      });
    });
};

//prompt that takes in the user input to creat the desired employee and adds it to
//list of other employees
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

//allowst the user to change the role of any employee
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
// allows the user to update an employees manager
const updateEmployeeManager = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "employee_id",
        message: "employee_id?",
      },
      {
        type: "input",
        name: "manager_id",
        message: "manager_id?",
      },
    ])
    .then((answers) => {
      connection.query(
        `UPDATE employee SET manager_id = ? WHERE id = ?`,
        [answers.manager_id, answers.employee_id],
        (err, results) => {
          if (err) throw err;

          console.table(results);
          askQuestion();
        }
      );
    });
};

//allows the user to easily exit the application
const quit = () => process.exit();

askQuestion();
