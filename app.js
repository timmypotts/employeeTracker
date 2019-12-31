const inquirer = require("inquirer");
const mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "a0E24me",
  database: "companyDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  menu();
});

function menu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "main",
        message: "Select an option:",
        choices: [
          "View database tables",
          "Update database tables",
          "Add employee, department, or role",
          "Quit"
        ]
      }
    ])
    .then(answers => {
      if (answers.main === "View database tables") {
        viewDatabase();
      } else if (answers.main === "Update database tables") {
        updateDatabase();
      } else if (answers.main === "Add employee, department, or role") {
        addObject();
      } else {
        connection.end();
      }
    });
}

function viewDatabase() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "display",
        message: "What table would you like to see? :",
        choices: ["Employees", "Roles", "Departments"]
      }
    ])
    .then(answers => {
      if (answers.display === "Employees") {
        displayEmployees();
      } else if (answers.display === "Roles") {
        displayRoles();
      } else {
        displayDepartments();
      }
    });
}

function updateDatabase() {
  //to be determined
}

function addObject() {
  //one sec
}

function displayEmployees() {
  console.log("Selecting all employees...\n");
  connection.query("SELECT * FROM employees", function(err, res) {
    // if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    connection.end();
  });
}

function displayRoles() {
  console.log("Selecting all employees...\n");
  connection.query("SELECT * FROM roles", function(err, res) {
    // if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    connection.end();
  });
}

function displayDepartments() {
  console.log("Selecting all employees...\n");
  connection.query("SELECT * FROM departments", function(err, res) {
    // if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    menu();
  });
}
