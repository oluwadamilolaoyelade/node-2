CREATE TABLE students (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(50),
    address VARCHAR,
    dob VARCHAR,
    email VARCHAR NOT NULL
);

CREATE TABLE school (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(50),
    address VARCHAR,
    year_established VARCHAR,
    email VARCHAR NOT NULL
);