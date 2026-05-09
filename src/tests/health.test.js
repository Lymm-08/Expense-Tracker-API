const request = require('supertest');
const app = require('../app');

describe('Expense Tracker API', () => {
  it('should return a healthy status', async () => {
    const response = await request(app).get('/api/v1/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'success', message: 'Expense Tracker API is healthy' });
  });
});
