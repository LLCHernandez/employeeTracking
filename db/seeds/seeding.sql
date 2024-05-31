DROP TABLE IF EXISTS department;
CREATE TABLE department(
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);
INSERT INTO department(name) VALUES
('Engineering'),
('Sales'),
('Human Resources'),
('Development'),
('Testing'),
('Customer Support');

DROP TABLE IF EXISTS role;
CREATE TABLE role(
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
	department INTEGER,
    FOREIGN KEY (department)
    REFERENCES department(id)
    ON DELETE SET NULL
);

INSERT INTO role(title, salary, department) VALUES
('Sales Lead', '100000', 2),
('Salesperson', '80000', 2),
('Lead Engineer', '150000', 1),
('Software Engineer', '125000', 1),
('Account Manager', '160000', 2);
('Support Lead', '100000', 6),
('Support Member', '65000', 6),
('Test Engineer', '120000', 5);


DROP TABLE IF EXISTS employee;
CREATE TABLE employee(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
	role INTEGER,
    FOREIGN KEY (role)
    REFERENCES role(id)
    ON DELETE SET NULL,
   	manager INTEGER,
	FOREIGN KEY (manager)
	REFERENCES employee(id)
	ON DELETE SET NULL
);
INSERT INTO employee(first_name, last_name, role, manager) VALUES
('Tim', 'Tester', 1, 5),
('Rick', 'Ross', 2, 5),
('Ally', 'Smith', 4),
('John', 'Doe', 3),
('Erik', 'Ellis', 6),
('Bob', 'Brown', 8, 9),
('Shelly', 'Hemmet', 7),
('Lisa', 'Gibbs', 5, 9),
('Odeal', 'Beckham', 1);