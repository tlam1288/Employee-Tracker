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
      choices: ["Add a new department", "Exit"],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "What would you like to do?":
          addNewDepartment();
          break;
        case "Exit":
          connection.end();
          break;
      }
    });
}

function addNewDepartment() {
  inquirer
    .prompt({
      name: "department",
      type: "input",
      message: "What is the department name?",
    })
    .then(function (answer) {
      const query = `INSERT INTO department(name) VALUES ?`;
      connection.query(query, { department: answer.department }, function (
        err,
        res
      ) {
        //if (err) throw err;
        // for (var i = 0; i < res.length; i++) {
        console.log(res.department);
        //}
        //startSearch();
      });
    });
}
