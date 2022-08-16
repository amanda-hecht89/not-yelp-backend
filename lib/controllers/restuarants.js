const { Router } = require('express');
const Restuarant = require('../models/Restuarants');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const data = await Restuarant.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
