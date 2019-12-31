DROP DATABASE IF EXISTS companyDB;
CREATE DATABASE companyDB;

USE companyDB;

CREATE TABLE employees
(
  id int
  AUTO_INCREMENT,
  first_name varchar
  (30) NOT NULL,
  last_name varchar
  (30) NOT NULL,
  role_id int NOT NULL,
  manager_id int NOT NULL,
  PRIMARY KEY
  (id)
);

  CREATE TABLE roles
  (
    id int
    AUTO_INCREMENT,
  title varchar
    (30),
  salary decimal,
  department_id int,
  PRIMARY KEY
    (id)
);

    CREATE TABLE department
    (
      id int
      AUTO_INCREMENT,
  name varchar
      (30)
);
