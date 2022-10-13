const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1, categoryId){
  const offset = helper.getOffset(page, config.listPerPage);
  const category = helper.searchCategory(categoryId);
  const rows = await db.query(
    `SELECT p.id, p.name, p.url_image, p.price, p.discount
    FROM product as p
    WHERE p.category='${category}'
    LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

module.exports = {
  getMultiple
}