DROP DATABASE IF EXISTS empolees_db
CREATE database empolees_db;

USE empolees_db;

CREATE TABLE Department (
  id INT NOT NULL,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id),
);


CREATE TABLE Role (
  id  INT NOT NULL,
  title VARCHAR(30) NULL,
  salary decimal(10,4) NULL,
  department_id INT NULL,

);


CREATE TABLE employee (
  id INT NOT NULL,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NULL,
  manager_id INT not null,
  
);
SELECT * FROM employees_db;

