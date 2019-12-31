INSERT INTO employees
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Jerry", "Seinfeld", 420),
    ("Elaine", "Bennes", 30, 1),
    ("Cosmo", "Kramer", 30, 1),
    ("George", "Costanza", 30, 1),
    ("Frank", "Costello", 420),
    ("Collin", "Sullivan", 30, 5);

INSERT INTO roles
    (title, salary, department_id)
VALUES
    ("Boss", 1000000, 420),
    ("Goon", 50000, 30);

INSERT INTO departments
    (name)
VALUES
    ("Seinfeld"),
    ("Departed");
