//helper functions, like calculating offset for pagination.
function getOffset(currentPage = 1, listPerPage) {
    return (currentPage - 1) * [listPerPage];
}

function searchCategory(category) {
    return (category);
}

function emptyOrRows(rows) {
    if (!rows) {
      return [];
    }
    return rows;
}

module.exports = {
    getOffset,
    emptyOrRows,
    searchCategory
}