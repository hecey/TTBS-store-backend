//glue between the URI and the corresponding function
const express = require('express');
const router = express.Router();
const products = require('../services/products');

// Ruta obtener listado de productos
router.get('/', async function(req, res, next) {
  try {
    res.json(await products.getMultiple(req.query.page,req.query.categoryId,req.query.name));
  } catch (err) {
    console.error(`Error while getting products `, err.message);
    next(err);
  }
});

// Ruta obtener total de páginas
router.get('/getNumPages', async function(req, res, next) {
  try {
    res.json(await products.getNumPages(req.query.categoryId,req.query.name));
  } catch (err) {
    console.error(`Error while getting pagination length `, err.message);
    next(err);
  }
});

module.exports = router;