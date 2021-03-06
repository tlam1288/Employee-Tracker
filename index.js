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
        "Update an employee's role",
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
        case "Update an employee's role":
          updateEmployee();
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

                  startSearch();
                }
              );
            });
        });
    });
}

//view all roles
function viewAllRoles() {
  const query = `SELECT role.department_id AS ID, department.name AS Department, role.title AS Title, role.salary AS Salary
  FROM role
  LEFT JOIN department
  ON department.id = role.department_id;`;
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
    .prompt({
      name: "fname",
      type: "input",
      message: "What is the employee's name?",
    })
    .then(function (newName) {
      inquirer
        .prompt({
          name: "lname",
          type: "input",
          message: "What is their last name?",
        })
        .then(function (newLastName) {
          inquirer
            .prompt({
              name: "id",
              type: "input",
              message: "What is the role ID?",
            })
            .then(function (roleId) {
              inquirer
                .prompt({
                  name: "managerId",
                  type: "input",
                  message: "What is the Manager ID?",
                })
                .then(function (managerid) {
                  const firstname = newName.fname;
                  const lastname = newLastName.lname;
                  const role_Id = roleId.id;
                  const newDeptId = managerid.managerId;
                  const sqlString = `INSERT INTO employee(first_name, last_name, role_id, manager_id)
                  VALUES (?,?,?,?);`;
                  connection.query(
                    sqlString,
                    [firstname, lastname, role_Id, newDeptId],
                    function (err, res) {
                      if (err) {
                        console.log("Error adding a role");
                      }

                      startSearch();
                    }
                  );
                });
            });
        });
    });
}

//view all employees
function viewAllEmployees() {
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

function updateEmployee() {
  inquirer
    .prompt({
      name: "fname",
      type: "input",
      message: "What is the employee's name?",
    })
    .then(function (newName) {
      inquirer
        .prompt({
          name: "lname",
          type: "input",
          message: "What is their last name?",
        })
        .then(function (newLastName) {
          inquirer
            .prompt({
              name: "managerId",
              type: "input",
              message: "What is the Manager ID?",
            })
            .then(function (managerid) {
              inquirer
                .prompt({
                  name: "id",
                  type: "input",
                  message: "What is the role ID?",
                })
                .then(function (employeeId) {
                  const firstname = newName.fname;
                  const lastname = newLastName.lname;
                  const newDeptId = managerid.managerId;
                  const ID = employeeId.id;
                  const sqlString = `UPDATE employee
                  SET first_name = ?, last_name = ?, manager_id = ?
                  WHERE id = ?;`;
                  connection.query(
                    sqlString,
                    [firstname, lastname, newDeptId, ID],
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
    });
}
