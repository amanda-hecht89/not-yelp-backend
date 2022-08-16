const { Router } = require('express');
const UserService = require('../services/UserService');
const OneDayInMs = 1000 * 60 * 60 * 24;

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
    }});

