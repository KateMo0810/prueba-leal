CREATE DATABASE leal_database;

USE leal_database;

CREATE TABLE _user(
    user_id VARCHAR(10) NOT NULL,
    created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR(12) NOT NULL,
    lastname VARCHAR(12) NOT NULL,
    birth_date DATETIME NOT NULL,
    email VARCHAR(150) NOT NULL,
    password VARCHAR(60) NOT NULL,
    CONSTRAINT pk_user PRIMARY KEY (user_id)
);

CREATE TABLE _transaction(
    transaction_id INT AUTO_INCREMENT NOT NULL,
    created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    value FLOAT NOT NULL,
    points INT NOT NULL,
    status INT DEFAULT 0,
    user_id VARCHAR(10) NOT NULL,
    CONSTRAINT pk_transaction PRIMARY KEY (transaction_id),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES _user(user_id)
);