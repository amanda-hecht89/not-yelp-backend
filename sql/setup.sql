-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE if EXISTS users;
DROP TABLE if EXISTS restuarants;

CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT
);

CREATE TABLE restuarants (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT,
    style TEXT,
    stars BIGINT
);

INSERT into restuarants (name, style, stars) values
('Pizza Planet', 'Pizza', '4'),
('Gusteaus', 'Italian', '3'),
('Good Burger', 'Burger', '5'),
('Chokey Chicken', 'Chicken', '1'),
('Krusty Krab', 'Seafood', '4')