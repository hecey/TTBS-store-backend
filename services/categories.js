const db = require('./db');
const helper = require('../helper');
const config = require('../config');

/**
 * Retorna el listado de categorías
 * @returns {json} Retorna categorías
 */
async function getCategories(){
  const rows = await db.query(
    `SELECT c.id, c.name
    FROM category as c`
  );
  const data = helper.emptyOrRows(rows);

  return {
    data,
  }
}

module.exports = {
  getCategories
}