INSERT INTO department (department_id, department_name) 
VALUES (1, "Manager"), (2, "Sales"), (3, "Finance"), (4, "Office Management"), (5, "Human Resources"), (6, "Warehouse"), 

INSERT INTO roles (title, salary, department_id)
VALUES ("Regional Manager", 75000, 1),
("Salesman", 40000, 2),
("Accountant", 45000, 3), 
("Office Administrator", 30000, 4),
("Customer Service Representative", 20000, 7),
("Warehouse Foreman", 25000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Denis", "Hartman", 1, 1),
("BIllie May", "Foster", 2, 2),
("Noelle", "Johns", 2, 1),
("Nathan", "Anderson", 3, 1),
("Janet", "Foster", 4, 1),
("Quevanze", "Harris", 5, 1),
("Harry", "Brown", 6, 1);

SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name, role.salary, concat(manager.first_name , " " , manager.last_name) AS "manager"
FROM employee
LEFT JOIN employee AS manager ON employee.manager_id = manager.id
INNER JOIN role ON employee.role_id = role.role_id
INNER JOIN department ON role.department_id = department.department_id
ORDER BY employee.id;