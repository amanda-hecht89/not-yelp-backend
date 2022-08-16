const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const mockUser = {
  firstName: 'Karen',
  lastName: 'Pumpernickle',
  email: 'imimportant@admin.com',
  password: 'shutItDown'
};

describe('not yelp backend', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new user and logs in same user', async () => {
    const res = await request(app).post('/api/v1/users/')
      .send(mockUser);
    const { firstName, lastName, email } = mockUser;

    expect(res.body).toEqual({
      Message: 'Welcome!',

      user: { id: expect.any(String),
        firstName,
        lastName,
        email, }
    });
  });

  it('logs in existing user and give same token back', async () => {
    await request(app).post('/api/v1/users/').send(mockUser);
    const res = await request(app).post('/api/v1/users/sessions').send({ email: 'imimportant@admin.com', password: 'shutItDown' });
    expect(res.status).toEqual(200);
  });



  afterAll(() => {
    pool.end();
  });
});
