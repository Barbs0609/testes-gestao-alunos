const request = require('supertest');
const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

async function loginAdmin() {
    const response = await request(baseUrl)
        .post('/api/auth/login')
        .send({
            email: process.env.ADMIN_EMAIL || 'admin@escola.com',
            senha: process.env.ADMIN_PASSWORD || 'admin123'
        });

    console.log('--- DEBUG RESPOSTA ---');
    console.log('Status:', response.status);
    console.log('Body:', response.body);

    return response.body.token;
}

module.exports = { loginAdmin };