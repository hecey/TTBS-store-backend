//helper functions, like calculating offset for pagination.
/**
 * Obtener el inicio de la pagina solicitada a ser obtenida
 * @param {number} currentPage=1 Pagina actual
 * @param {number} listPerPage Numero de items por pagina
 * @returns {number} Inicio de pagina a solicitar
 */
function getOffset(currentPage = 1, listPerPage) {
    return (currentPage - 1) * [listPerPage];
}

/**
 * Devuelve un arreglo vació en caso de no existir datos en el dataset o devuelve el dataset
 * @param {dataset} rows Dataset SQL
 * @returns {dataset} Dataset SQL
 */
function emptyOrRows(rows) {
    if (!rows) {
      return [];
    }
    return rows;
}

module.exports = {
    getOffset,
    emptyOrRows,
}