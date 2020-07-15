-- test for department table
INSERT INTO department(name)
VALUES 
("accounting"),
("sales"),
("engineering")
;

-- test for role table
INSERT INTO role(title, salary, department_id)
VALUES ("accountant", 80000.00, 1),
("sales", 75000.00, 2),
("marketer", 84000.00, 2),
("researcher", 79000.00, 3),
("finance", 100000.00, 1),
("administration", 65000, 2),
("engineer", 120000, 3)
;

-- test for employee table
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("John", "Quintos", 1, 11),
("Timothy", "Lam", 2, 12),
("Joanna", "Bambico", 3, 13),
("Richie", "Gavino", 1, 14),
("Chad", "Codina", 1, 15),
("Mal", "Tousithi", 3, 16)
;