const request = require('supertest');
const app = require('../server/app');
const pool = require('../database/index');

afterAll(async () => { await pool.end(); });

describe('GET /api/scores', () => {
  beforeEach(() => {
    const username = 'testusername';
    const score = 100;
    const scoreDate = new Date().toISOString().slice(0, 10);
    const query = `INSERT INTO scores (username, score, score_date) VALUES ('${username}', ${score}, '${scoreDate}');`;
    pool.query(query);
  });

  test('Should respond with an array of objects with user data', async () => {
    const { body, statusCode } = await request(app).get('/api/scores');
    expect(statusCode).toBe(200);
    expect(Array.isArray(body)).toBe(true);

    for (let i = 0; i < body.length; i += 1) {
      expect(body[i]).toEqual(expect.objectContaining({
        username: expect.any(String),
        score: expect.any(Number),
        score_date: expect.any(String),
      }));
    }
  });
});

describe('POST /api/scores', () => {
  beforeEach(() => { pool.query('DELETE FROM scores;'); });
  afterEach(() => { pool.query('DELETE FROM scores;'); });

  test('Should insert a new score into the database', async () => {
    const username = `testuser${Date.now()}`;
    const score = Math.floor(Math.random() * 10000);
    await request(app).post('/api/scores').send({ username, score });

    const { body } = await request(app).get('/api/scores');
    expect(body).toEqual(expect.arrayContaining([
      {
        username,
        score,
        score_date: expect.any(String),
      },
    ]));
  });
});
