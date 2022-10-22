const db = require("./db");
const helper = require("../helper");
const config = require("../config");

/**
 * Obtiene la lista de productos de acuerdo a los filtros
 *
 * @param {number} page=1 Numero de pagina
 * @param {number} categoryId Id de categoría
 * @param {string} name Nombre de producto
 * @returns {json} Listado de productos
 */
async function getMultiple(page = 1, categoryId, name) {
  const offset = helper.getOffset(page, config.listPerPage);

  //Filtro de búsqueda
  let whereFilter = ""
  let whereParam = ""
  // si existe una un id de categoría se la agrega a la búsqueda  como filtro
  if (categoryId) {
    whereFilter = 'p.category=?'
    whereParam = categoryId
  }

  if (name) {
    whereFilter = "p.name like concat('%',?,'%')"
    whereParam = name
  }

  const sqlQuery = `SELECT p.id, p.name, p.url_image, p.price, p.discount FROM product as p where ${whereFilter} LIMIT ? offset ?`
  //Se previene SQLInjection con placeholder que realiza escaping
  const rows = await db.query(sqlQuery, [whereParam, config.listPerPage, offset], function (err, result) {
    if (err) throw err;
    console.log(result);
  });

  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta
  };
}

/**
 * Retorna el numero total de paginas según el filtro
 * @param {number} categoryId Id de categoría
 * @param {string} name Nombre de producto
 * @returns {Json} Numero total de paginas
 */
async function getNumPages(categoryId, name) {

  //Filtro de búsqueda
  let whereFilter = ""
  let whereParam = ""

  if (categoryId) {
    whereFilter = 'p.category=?'
    whereParam = categoryId
  }

  if (name) {
    whereFilter = "p.name like concat('%',?,'%')"
    whereParam = name
  }

  const sqlQuery = `SELECT CEILING(COUNT(*) / ${config.listPerPage} ) as pages FROM product as p where ${whereFilter}`

  //Se previene SQLInjection con placeholder que realiza escaping
  const rows = await db.query(sqlQuery, [whereParam]);
  const data = helper.emptyOrRows(rows);

  return {
    data
  };
}

module.exports = {
  getMultiple,
  getNumPages
};
