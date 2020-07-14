-- test for department table
INSERT INTO department(name)
VALUES 
("Accounting"),
("HR"),
("Marketing"),
("Research"),
;

-- test for role table
INSERT INTO role(title, salary, department_id)
VALUES ("accounting", 80,000.00, 32);

-- test for employee table
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("John", "Quintos", 32, 11);