# Task List

- setup
  - create repo
  - add .gitignore with node_modules
  - initialize npm (`npm init`)
  - install dependencies (inquirer, mysql, console.table)
- Establish a connection to the database
- Prompt user to choose action (start menu)
  Should provide following commands:

```
  - Add new department
  - View Departments
  - Add new role
  - View Roles
  - Add new Employee
  - View employee
  - Update employee role
```

- Add new department
  - Create addDepartment function
  - prompt user for a department name
  - create query string to create department
  - run connection.query
  - if there is an error
  - then print unable to process
  - else print success message
  - call start menu
- View Departments
- Add new role
- View Roles
- Add new Employee
- View employee
- Update employee role
