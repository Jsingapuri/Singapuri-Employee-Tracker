use employees;

INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Lead', 80000, 1),
    ('Salesperson', 70000, 1),
    ('Lead Engineer', 200000, 2),
    ('Software Engineer', 180000, 2),
    ('Account Manager', 200000, 3),
    ('Accountant', 150000, 3),
    ('Legal Team Lead', 300000, 4),
    ('Lawyer', 200000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Kimble', 1, NULL),
    ('Jack', 'Slater', 2, 1),
    ('John', 'Spartan', 3, NULL),
    ('Rocky', 'Balboa', 4, 3),
    ('John', 'Matrix', 5, NULL),
    ('Jericho', 'Cane', 6, 5),
    ('John', 'Rambo', 7, NULL),
    ('Marion', 'Cobretti', 8, 7);