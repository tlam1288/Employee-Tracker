-- test for department table
INSERT INTO department(name)
VALUES 
("accounting"),
("HR"),
("marketing"),
("research"),
("finance"),
("administration"),
("engineering"),
("legal")
;

-- test for role table
INSERT INTO role(title, salary, department_id)
VALUES ("accounting", 80000.00, 1),
("HR", 75000.00, 2),
("marketing", 84000.00, 3),
("research", 79000.00, 4),
("finance", 100000.00, 5),
("administration", 65000, 6),
("engineering", 120000, 7),
("legal", 105000, 8)
;

-- test for employee table
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("John", "Quintos", 1, 11),
("Timothy", "Lam", 2, 12),
("Joanna", "Bambico", 3, 13),
("Richie", "Gavino", 4, 14);