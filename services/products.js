const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultiple(page = 1, categoryId, name) {
  //Se previene SQLInjection con escape
  categoryId = db.escape(categoryId);
  page = db.escape(page);
  name = db.escape(name);

  const offset = helper.getOffset(page, config.listPerPage);

  //Filtro de búsqueda
  const searchFilter = categoryId // si existe una un id de categoría se la agrega a la búsqueda  como filtro
    ? ` p.category='${categoryId}' `
    : name // si existe un nombre de producto se lo agrega a la búsqueda como filtro
      ? ` p.name like '%${name}%' `
      : '';

  //Si el filtro no esta vació se agrega el where a la consulta
  const where = searchFilter != "" ? `where ${search}` : "";

  const rows = await db.query(
    'SELECT p.id, p.name, p.url_image, p.price, p.discount FROM product as p ? LIMIT ?,?', where, offset, config.listPerPage);
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta
  };
}

async function getNumPages(categoryId, name) {
  //Se previene SQLInjection con escape
  categoryId = db.escape(categoryId);
  name = db.escape(name);

  //Filtro de búsqueda
  const category = helper.searchCategory(categoryId);
  const search = categoryId // si existe una un id de categoría se la agrega a la búsqueda  como filtro
    ? ` p.category='${category}' `
    : name // si existe un nombre de producto se lo agrega a la búsqueda como filtro
      ? ` p.name like '%${name}%' `
      : '';

  //Si el filtro no esta vació se agrega el where a la consulta
  const where = search != "" ? `where ${search}` : "";

  const rows = await db.query(
    'SELECT CEILING(COUNT(*) / ? ) as pages FROM product as p ?', config.listPerPage, where
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta
  };
}

module.exports = {
  getMultiple,
  getNumPages
};
