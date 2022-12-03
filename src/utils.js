const {
  reduce, head, max, pipe, trim, split,
} = require('ramda');

function maxList(list) {
  return reduce(max, head(list), list);
}

const splitInput = pipe(
  trim,
  split('\n'),
);

module.exports = { maxList, splitInput };
