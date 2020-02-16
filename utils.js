function byField(field){
  return (a, b) => a[field] > b[field] ? 1 : -1;
}

function sortArray(array, field, order){
  let result = array;
  result.sort( byField(field) );
  if (order == 'DESC') result.reverse();
  return result;
}

module.exports.sortArray = sortArray;
