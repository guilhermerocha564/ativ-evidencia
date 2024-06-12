const express = require("express");

const { Pool } = require("pg");

const app = express();

const PORT = 7007;

app.use(express.json());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "escolaevidencia",
  password: "ds564",
  port: 7007,
});

app.use(express.json());

app.get("/alunos", async (req, res) => {
  try {
    const resultado = await pool.query("SELECT * FROM alunos");
    res.json({
      todos: resultado.rowsCount,
      alunos: resultado.rows,
    });
  } catch (error) {
    console.error("Erro ao buscar alunos", error);
    res.status(500).json({ erro: "Erro ao buscar alunos" });
  }
});

app.post("/alunos", async (req, res) => {
  try {
    const { nome, idade, turma, email, cpf } = req.body;

    await pool.query(
      "INSERT INTO alunos (nome, idade, turma, email, cpf) VALUES ($1, $2, $3, $4, 5)",
      [nome, idade, turma, email, cpf]
    );

    res.json({ mensagem: "Aluno cadastrado com sucesso" });
  } catch (error) {
    console.error("Erro ao cadastrar aluno", error);
    res.status(500).json({ erro: "Erro ao cadastrar aluno" });
  }
});

app.get("/alunos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query("SELECT * FROM alunos WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ erro: "Aluno não encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Erro ao buscar aluno", error);
    res.status(500).json({ erro: "Erro ao buscar aluno" });
  }
});

app.put("/alunos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, idade, turma, cpf } = req.body;

    await pool.query(
      "UPDATE alunos SET nome = $1, idade = $2, turma = $3, email = $4 cpf = $5 WHERE id = $6",
      [nome, idade, turma, email, cpf, id]
    );

    res.json({ mensagem: "Aluno atualizado com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar aluno", error);
    res.status(500).json({ erro: "Erro ao atualizar aluno" });
  }
});

app.delete("/alunos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM alunos WHERE id = $1", [id]);

    res.json({ mensagem: "Aluno deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar aluno", error);
    res.status(500).json({ erro: "Erro ao deletar aluno" });
  }
});
