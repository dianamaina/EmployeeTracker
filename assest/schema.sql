  
DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE department (
department_id INTEGER(3) NOT NULL PRIMARY KEY,
department_name VARCHAR(30) NOT NULL 
);

CREATE TABLE role (
role_id INTEGER(3) NOT NULL AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(50) NOT NULL, 
salary DECIMAL(10,2), 
department_id INTEGER(3), 
CONSTRAINT fk_department_id FOREIGN KEY (department_id) REFERENCES department(department_id)
ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE employee (
id INTEGER(3) NOT NULL AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INTEGER(3), 
CONSTRAINT fk_role_id FOREIGN KEY (role_id) REFERENCES role(role_id)
ON DELETE CASCADE ON UPDATE CASCADE,
manager_id INTEGER(3) DEFAULT null,
CONSTRAINT fk_manager_id FOREIGN KEY (manager_id) REFERENCES employee(id)
ON DELETE CASCADE ON UPDATE CASCADE
);
