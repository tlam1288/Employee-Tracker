-- test for department table
INSERT INTO department(id, name)
VALUES (1, "Timothy Lam");

-- test for role table
INSERT INTO role(id, title, salary, department_id)
VALUES (1, "accounting", 80,000.00, 32);

-- test for employee table
INSERT INTO employee(id, first_name, last_name, role_id, manager_id)
VALUES (1, "John", "Quintos", 32, 11);