const {
  reduce, head, max,
} = require('ramda');

function maxList(list) {
  return reduce(max, head(list), list);
}

module.exports = { maxList };
