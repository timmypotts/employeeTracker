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
        // connection.query("SELECT * FROM employees", function(err, res) {
        //   if (err) throw err;
        //   console.table(res);
        // });
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
        choices: ["Employees", "Roles", "Departments", "Go Back"]
      }
    ])
    .then(answers => {
      if (answers.display === "Employees") {
        displayEmployees();
      } else if (answers.display === "Roles") {
        displayRoles();
      } else if (answers.display === "Departments") {
        displayDepartments();
      } else {
        menu();
      }
    });
}

function updateDatabase() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "update",
        message:
          "Enter the ID number of the employee you would like to update :"
      }
    ])
    .then(answers => {
      var employeeID = answers.update;
      inquirer
        .prompt([
          {
            type: "input",
            name: "newID",
            message: "What is their new role ID? :"
          }
        ])
        .then(answers => {
          var newID = answers.newID;
          console.log(employeeID);
          connection.query(
            `UPDATE employees SET role_id = ${newID} WHERE id = ${employeeID}`
          );
          menu();
        });
    });
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
    viewDatabase();
  });
}

function displayRoles() {
  console.log("Selecting all employees...\n");
  connection.query("SELECT * FROM roles", function(err, res) {
    // if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    viewDatabase();
  });
}

function displayDepartments() {
  console.log("Selecting all employees...\n");
  connection.query("SELECT * FROM departments", function(err, res) {
    // if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    viewDatabase();
  });
}

function addObject() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "addChoice",
        message: "What would you like to add? :",
        choices: ["Employee", "Role", "Department", "Go Back"]
      }
    ])
    .then(answers => {
      if (answers.addChoice === "Employee") {
        addEmployee();
      } else if (answers.addChoice === "Role") {
        addRole();
      } else if (answers.addChoice === "Department") {
        addDepartment();
      } else {
        menu();
      }
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Please enter the employees's first name:",
        name: "firstName"
      },
      {
        type: "input",
        message: "Please enter the employee's last name:",
        name: "lastName"
      },
      {
        type: "input",
        message: "Please enter the employee's role_id",
        name: "roleID"
      },
      {
        type: "input",
        message:
          "Please enter the ID of the manager that this employee reports to.",
        name: "managerID"
      }
    ])
    .then(answers => {
      var firstName = answers.firstName;
      var lastName = answers.lastName;
      var roleID = answers.roleID;
      var managerID = answers.managerID;
      connection.query(`INSERT INTO employees
      (first_name, last_name, role_id, manager_id)
    VALUES
      (${firstName}, ${lastName}, ${roleID}, ${managerID});`),
        function(err, res) {
          if (err) throw err;
        };
    });
  menu();
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "prompt",
        message: "What is the new role title? :",
        name: "title"
      },
      {
        type: "input",
        message: "What is the salary of this new role? :",
        name: "salary"
      },
      {
        type: "input",
        message: "What is the department ID for this new role? :",
        name: "id"
      }
    ])
    .then(answers => {
      var title = answers.title;
      var salary = answers.salary;
      var id = answers.id;

      connection.query(
        `INSERT INTO roles (title, salary, department_id) VALUES (${title}, ${salary}, ${id})`,
        function(err, res) {
          if (err) throw err;
        }
      );
    });
    menu();
}

function
