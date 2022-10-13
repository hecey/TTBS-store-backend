//glue between the URI and the corresponding function
const express = require('express');
const router = express.Router();
const products = require('../services/categories');


router.get('/', async function(req, res, next) {
  try {
    res.json(await products.getCategories());
  } catch (err) {
    console.error(`Error while getting categories `, err.message);
    next(err);
  }
});

module.exports = router;