CREATE DATABASE homebanking;

USE homebanking;

CREATE TABLE roles(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    dni VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    amount FLOAT(16),
    account VARCHAR(255),
    roles_id INT,
    FOREIGN KEY (roles_id) REFERENCES roles(id)
);

CREATE TABLE transfers(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_source_id INT,
    user_target_id INT,
    FOREIGN KEY (user_source_id) REFERENCES users(id),
    FOREIGN KEY (user_target_id) REFERENCES users(id),
    amount FLOAT(16),
    date_transfer date
);