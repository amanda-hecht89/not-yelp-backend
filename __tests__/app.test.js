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

  it('creates a new user and logs in same user', () => {
    const res = request(app).post('/api/v1/users/')
      .send({ firstName: 'Karen', lastName: 'Pumpernickle', email: 'imimportant@admin.com', password: 'shutItDown' });
    const { firstName, lastName, email } = mockUser;
    
    expect(res.body).toEqual({

      id: expect.any(String),
      firstName,
      lastName,
      email,
    });
  });



  afterAll(() => {
    pool.end();
  });
});
