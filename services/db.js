const mysql = require('mysql2/promise');
const config = require('../config');

/**
 * Conectar a la base y ejecutar consulta
 * @param {any} sql query sql
 * @param {any} params parámetros
 * @returns {json} Datos obtenidos
 */
async function query(sql, params) {
  const connection = await mysql.createConnection(config.db);
  //Se previene SQLInjection con placeholder que realiza escaping
  const [results, ] = await connection.execute(sql, params);

  return results;
}

module.exports = {
  query
}