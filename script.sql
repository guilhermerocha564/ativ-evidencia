CREATE DATABASE escolaevidencia;

CREATE TABLE alunos(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    idade  INT,
    turma VARCHAR(10),
    email VARCHAR(255) NOT NULL,
    cpf INT NOT NULL
);

