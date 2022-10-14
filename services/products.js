const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultiple(page = 1, categoryId, name) {
  const offset = helper.getOffset(page, config.listPerPage);
  const category = helper.searchCategory(categoryId);
  const search = categoryId
    ? ` p.category='${category}' `
    : name
    ? ` p.name like '%${name}%' `
    : '';
  const where = search != "" ? `where ${search}` : "";

  const rows = await db.query(
    `SELECT p.id, p.name, p.url_image, p.price, p.discount
    FROM product as p
    ${where}
    LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function getNumPages(categoryId, name) {
  const category = helper.searchCategory(categoryId);
  const search = categoryId
    ? ` p.category='${category}' `
    : name
    ? ` p.name like '%${name}%' `
    : '';
  const where = search != "" ? `where ${search}` : "";

  const rows = await db.query(
    `SELECT CEILING(COUNT(*) / ${config.listPerPage}) as pages
    FROM product as p
    ${where}
    `
  );
  const data = helper.emptyOrRows(rows);

  return {
    data
  };
}

module.exports = {
  getMultiple,
  getNumPages
};
