  
DROP DATABASE IF EXISTS employess_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department(
    id INT NOT NULL,
    name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE role(
    id INT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE employee(
    id INT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
  PRIMARY KEY (id)
)