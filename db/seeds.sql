INSERT INTO department (name) VALUES
('Sales'),
('Engineering'),
('Finance'),
('Human Resources');

INSERT INTO role (title, salary, department_id) VALUES
('Sales Manager', 80000, 1),
('Salesperson', 50000, 1),
('Software Engineer', 100000, 2),
('Accountant', 70000, 3),
('HR Specialist', 60000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, 1),
('Emily', 'Jones', 3, NULL),
('Mark', 'Brown', 4, NULL),
('Sarah', 'Connor', 5, 3);