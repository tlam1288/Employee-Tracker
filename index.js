var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require("console.table");
var connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "password",
  database: "employee_tracker",
});
connection.connect(function (err) {
  if (err) throw err;
  startSearch();
});

function startSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Add a new department",
        "View all departments",
        "Add a new role",
        "View all roles",
        "Add an employee",
        "View all employees",
        "Exit",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "Add a new department":
          addNewDepartment();
          break;
        case "View all departments":
          viewDepartments();
          break;
        case "Add a new role":
          addNewRole();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "View all employees":
          viewAllEmployees();
          break;
        case "Exit":
          connection.end();
          break;
      }
    });
}

//Add a new department
function addNewDepartment() {
  inquirer
    .prompt({
      name: "department",
      type: "input",
      message: "What is the department name?",
    })
    .then(function (answer) {
      const query = `INSERT INTO department(name) VALUES (?)`;
      connection.query(query, answer.department, function (err, res) {
        if (err) {
          throw err;
        }
        console.log("Department was added successfully");
        startSearch();
      });
    });
}

//view all departments
function viewDepartments() {
  const query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
    if (err) {
      throw err;
    }
    console.table(res);
    startSearch();
  });
}

function addNewRole() {
  inquirer
    .prompt(
      {
        name: "role",
        type: "input",
        message: "What role would you like to add?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary for this role?",
      },
      {
        name: "id",
        type: "input",
        message: "What is the department ID?",
      }
    )
    .then(function (answer) {
      const query = `INSERT INTO role(title,salary, department_id) VALUES (?,?,?)`;
      connection.query(
        query,
        [answer.role, answer.salary, answer.id],
        function (err, res) {
          if (err) {
            throw err;
          }
          console.log("A new role was added successfully");
          //addSalary();
        }
      );
    });
}
//add salary
function addSalary() {
  inquirer
    .prompt({
      name: "salary",
      type: "input",
      message: "What is the salary for this role?",
    })
    .then(function (answer) {
      const query = `INSERT INTO role(salary) VALUES (?) WHERE title = ${this.answer.role}`;
      connection.query(query, answer.salary, function (err, res) {
        if (err) {
          throw err;
        }
        console.log("Salary was added successfully");
        startSearch();
      });
    });
}

//view all roles
function viewAllRoles() {
  const query = "SELECT * FROM role";
  connection.query(query, function (err, res) {
    if (err) {
      throw err;
    }
    console.table(res);
    startSearch();
  });
}

function addEmployee() {
  inquirer
    .prompt({
      name: "firstname",
      type: "input",
      message: "What is the first name of the employee?",
    })
    .then(function (answer) {
      const query = `INSERT INTO employee(first_name) VALUES (?) `;
      connection.query(query, answer.firstname, function (err, res) {
        if (err) {
          throw err;
        }
        console.log("Employee was added successfully");
        startSearch();
      });
    });
}

function viewAllEmployees() {}
