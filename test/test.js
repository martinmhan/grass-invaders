const request = require('supertest');
const app = require('../server/app');

describe('GET /api/scores', () => {
  test('Should respond with an array of objects with user data', async () => {
    const response = await request(app).get('/api/scores');
    expect(response.statusCode).toBe(200);
    expect(response.isArray).toBe(true);
    for (let i = 0; i < response.length; i += 1) {
      expect(response[i]).toEqual(expect.objectContaining({
        username: expect.any(String),
        score: expect.any(Number),
        score_date: expect.any(String),
      }));
    }
  });
});
