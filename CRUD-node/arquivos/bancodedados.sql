CREATE DATABASE afazer_bd;

--\c dentro do banco afazer;

CREATE TABLE afazeres(
    afazer_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);
