import request from 'supertest';
import prisma from '../../prisma/client';
import app from '../index';

describe('POST /api/auth/signup', () => {
  const testEmail = 'testuser@example.com';

  afterAll(async () => {
    await prisma.user.deleteMany({ where: { email: testEmail } });
    await prisma.$disconnect();
  });

  it('should create a new user', async () => {
    const res = await request(app).post('/api/auth/signup').send({
      email: testEmail,
      password: 'securepassword',
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
  });
});
