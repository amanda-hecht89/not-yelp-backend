const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const Restuarant = require('../models/Restuarant');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const data = await Restuarant.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res) => {
    const food = await Restuarant.getById(req.params.id);
    food.reviews = await food.getRestReviews();
    res.json(food);
  })
  .get('/:id', async (req, res,) => {
    const foods = await Restuarant.getById(req.params.id);
    res.json(foods);
  })
  .post('/', authenticate, authorize, async (req, res, next) => {
    try {
      const data = await Restuarant.insert(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
