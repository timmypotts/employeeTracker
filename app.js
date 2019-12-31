const inquirer = require("inquirer");
const mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "a0E24me",
  database: "employeeDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  createProduct();
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
          "Add employee, department, or role"
        ]
      }
    ])
    .then(answers => {
      if (answers.main === "View database tables") {
        viewDatabase();
      } else if (answers.main === "Update database tables") {
        updataDatabase();
      } else {
        addObject();
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
        //display employee table
      } else if (answers.display === "Roles") {
        //display roles
      } else {
        //display department
      }
    });
}

function updateDatabase() {
  //to be determined
}

function addObject() {
  //one sec
}
