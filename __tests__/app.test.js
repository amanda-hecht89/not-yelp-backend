const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

const mockUser = {
  firstName: 'Karen',
  lastName: 'Pumpernickle',
  email: 'imimportant@admin.com',
  password: 'shutItDown'
};

const registerAndLogin = async (userProps = {}) => {
  const password = userProps.password ?? mockUser.password;
  const agent = request.agent(app);
  const user = await UserService.create({ ...mockUser, ...userProps });
  const { email } = user;
  await agent.post('/api/v1/users/sessions').send({ email, password });
  return [agent, user];
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


  it('shows list of users for authenticated members only', async () => {
    const [agent] = await registerAndLogin();
    const res = await agent.get('/api/v1/users');
    expect(res.status).toBe(200);
  });



  afterAll(() => {
    pool.end();
  });
});
