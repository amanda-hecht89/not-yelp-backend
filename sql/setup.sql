-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE if EXISTS users cascade;
DROP TABLE if EXISTS reviews cascade;
DROP TABLE if EXISTS restuarants cascade;

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

CREATE TABLE reviews (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    restuarant_id BIGINT,
    user_id BIGINT,
    stars BIGINT,
    details TEXT,
    foreign key (restuarant_id) references restuarants(id),
    foreign key (user_id) references users(id)
);

INSERT into restuarants (name, style, stars) values
('Pizza Planet', 'Pizza', '4'),
('Gusteaus', 'Italian', '3'),
('Good Burger', 'Burger', '5'),
('Chokey Chicken', 'Chicken', '1'),
('Krusty Krab', 'Seafood', '4');

INSERT into users (first_name, last_name, email, password_hash) values 
('Kevin', 'Bacon', 'ilovepork@meatsweats.com', 'fake_password'),
('Steph', 'Curry', 'toospiceyforme@basketballplayer.com', 'fake_password'),
('Iced', 'Tea', 'sweetisbetter@beverages.com', 'fake_password'),
('John', 'Candy', 'ioverdosed@cocaine.com', 'fake_password'),
('Shirley', 'Temple', 'spriteandgrenadine@underaged.com', 'fake_password');

INSERT into reviews (restuarant_id, user_id, stars, details) values
('3', '1', '4', 'Was able to put bacon on my burger'),
('5', '3', '2', 'No tea only kelp juice, I dont like kelp juice'),
('1', '2', '5', 'So many games to play!!!!!'),
('2', '4', '3', 'Wasnt really hungry'),
('4', '1', '1', 'Didnt have any bacon'),
('2', '2', '1', 'I saw a rat!!!!')



