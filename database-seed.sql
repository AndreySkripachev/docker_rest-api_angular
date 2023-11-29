CREATE TABLE users
(
    id SERIAL,
    email text UNIQUE,
    first_name text,
    last_name text,
    password text,
    CONSTRAINT users_pkey PRIMARY KEY (id)
);

INSERT INTO users(email, password, first_name, last_name) VALUES
 ('andrey.skripachev@gmail.com', 'password', 'Andrey', 'Skripachev'),
 ('qwe@qwe.qwe', 'qwe123qwe', 'Qwe', 'Rty');
