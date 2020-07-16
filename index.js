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
    .prompt({
      name: "role",
      type: "input",
      message: "What role would you like to add?",
    })
    .then(function (roleToAdd) {
      inquirer
        .prompt({
          name: "salary",
          type: "input",
          message: "What is the salary for this role?",
        })
        .then(function (salaryToAdd) {
          inquirer
            .prompt({
              name: "id",
              type: "input",
              message: "What is the department ID?",
            })
            .then(function (deptId) {
              const newRole = roleToAdd.role;
              const newSalary = salaryToAdd.salary;
              const newDeptId = deptId.id;
              const sqlString = `INSERT INTO role(title, salary, department_id)
              VALUES (?, ? ,?);`;
              connection.query(
                sqlString,
                [newRole, newSalary, newDeptId],
                function (err, res) {
                  if (err) {
                    console.log("Error adding a role");
                  }
                  console.table(res);
                  startSearch();
                }
              );
            });
        });
    });
}

//view all roles
function viewAllRoles() {
  const query = `SELECT
  employee.id AS ID,
  CONCAT(employee.first_name, " ", employee.last_name) AS Name,
  role.title AS Role,
  department.name AS Department,
  employee.manager_id AS ManagerID
  FROM employee
  INNER JOIN role ON employee.role_id = role.id
  INNER JOIN department ON role.department_id = department.id;`;
  connection.query(query, function (err, res) {
    if (err) {
      throw err;
    }
    console.table(res);
    startSearch();
  });
}

//add new employee
function addEmployee() {
  inquirer
    .prompt(
      {
        name: "firstname",
        type: "input",
        message: "What is the first name of the employee?",
      },
      {
        name: "lastname",
        type: "input",
        message: "What is the last name of the employee?",
      }
    )
    .then(function (answer) {
      const query = `INSERT INTO employee(first_name, last_name) VALUES (?, ?) `;
      connection.query(query, [answer.firstname, answer.lastname], function (
        err,
        res
      ) {
        if (err) {
          throw err;
        }
        console.log("Employee was added successfully");
        startSearch();
      });
    });
}

//view all employees
function viewAllEmployees() {
  const query = "SELECT * FROM employee";
  connection.query(query, function (err, res) {
    if (err) {
      throw err;
    }
    console.table(res);
    startSearch();
  });
}
