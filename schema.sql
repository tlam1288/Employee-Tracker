DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;
USE employee_tracker;

CREATE TABLE department(
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role(
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee(
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(id)  
);

-- Joining 3 tables

SELECT
        employee.id AS ID,
        CONCAT(employee.first_name, " ", employee.last_name) AS Name,
        role.title AS Role,
        department.name AS Department,
        employee.manager_id AS ManagerID
      FROM employee
      INNER JOIN role ON employee.role_id = role.id
      INNER JOIN department ON role.department_id = department.id;

--updated query
UPDATE employee
SET first_name = ?, last_name = ?, manager_id = ?
WHERE id = ?;

--display merged tables of departmant and roles
SELECT role.department_id AS ID, department.name AS Department, role.title AS Title, role.salary AS Salary
FROM role
LEFT JOIN department
ON department.id = role.department_id;