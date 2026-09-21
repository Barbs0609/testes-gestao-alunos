const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();

const { loginAdmin, loginAluno } = require('../helpers/auth');
const alunoData = require('../data/aluno.json');

const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:3000';

describe('Fluxo Completo de Gestão de Alunos', () => {
  let tokenAdmin;
  let tokenAluno;
  let alunoId;

  it('Deve obter token do Administrador', async () => {
    tokenAdmin = await loginAdmin();
    expect(tokenAdmin).to.be.a('string');
  });

  it('Deve cadastrar um novo aluno via Data-Driven', async () => {
    const response = await request(baseUrl)
      .post('/api/admin/alunos')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send({
      nome: alunoData.nome,
      email: alunoData.email,
      matricula: alunoData.matricula,
      senha: alunoData.senha
    });

    alunoId = response.body.id || response.body._id || response.body.aluno?.id;

    expect(response.status).to.equal(201);

  it('Deve realizar login com o aluno criado', async () => {
    tokenAluno = await loginAluno(alunoData.email, alunoData.senha);
    expect(tokenAluno).to.be.a('string');
  });

  it('Deve registrar a entrega do trabalho do aluno', async () => {
    const response = await request(baseUrl)
      .post(`/${alunoId}/trabalhos`)
      .set('Authorization', `Bearer ${tokenAluno}`)
      .send({
        titulo: alunoData.tituloTrabalho,
        descricao: alunoData.descricaoTrabalho
      });

    expect(response.status).to.equal(201);
  });
});
});