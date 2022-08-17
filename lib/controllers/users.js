const { Router } = require('express');
const UserService = require('../services/UserService');
const OneDayInMs = 1000 * 60 * 60 * 24;
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const User = require('../models/User');

module.exports = Router() 
  .post('/', async (req, res, next) => {
    try {
      const user = await UserService.create(req.body);
      res.cookie(process.env.COOKIE_NAME, user, {
        httpOnly: true,
        maxAge: OneDayInMs,
      })
        .json({ user, Message: 'Welcome!' });
    } catch (e) {
      next(e);
    }})
  .post('/sessions', async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const token = await UserService.signIn({ email, password });
      res.cookie(process.env.COOKIE_NAME, token, {
        httpOnly: true,
        maxAge: OneDayInMs,
      })
        .json({ Message: 'Welcome!' });
    } catch (e) {
      next(e);
    }
  })
  .get('/', authenticate, authorize, async (req, res, next) => {
    try {
      const data = await User.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  });


