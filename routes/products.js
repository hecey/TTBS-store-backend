//glue between the URI and the corresponding function
const express = require('express');
const router = express.Router();
const products = require('../services/products');


router.get('/', async function(req, res, next) {
  try {
    res.json(await products.getMultiple(req.query.page,req.query.categoryId));
  } catch (err) {
    console.error(`Error while getting products `, err.message);
    next(err);
  }
});

module.exports = router;