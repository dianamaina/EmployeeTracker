INSERT INTO department (department_id, department_name) 
VALUES (1, "Manager"), (2, "Sales"), (3, "Finance"), (4, "Office Management"), (5, "Human Resources"), (6, "Warehouse"), (7, "Information Technology");

INSERT INTO role (title, salary, department_id) 
VALUES ("Regional Manager", 60000, 1),
("Salesman", 50000, 2),
("Accountant", 40000, 3), 
("Office Administrator", 40000, 4),
("Customer Service Representative", 35000, 5),
("Warehouse Foreman", 55000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Michael", "Scott", 1, null),
("Jim", "Halpert", 2, 1),
("Dwight", "Schrute", 2, 1),
("Kevin", "Malone", 3, 1),
("Pam", "Beesley", 4, 1),
("Kelly", "Kapor", 5, 1),
("Darryl", "Philbin", 6, 1);

SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name, role.salary, concat(manager.first_name , " " , manager.last_name) AS "manager"
FROM employee
LEFT JOIN employee AS manager ON employee.manager_id = manager.id
INNER JOIN role ON employee.role_id = role.role_id
INNER JOIN department ON role.department_id = department.department_id
ORDER BY employee.id;