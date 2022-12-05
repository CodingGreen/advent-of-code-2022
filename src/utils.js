const {
  reduce, head, max, pipe, trim, split, curry, gte, and, lte,
} = require('ramda');

function maxList(list) {
  return reduce(max, head(list), list);
}

const splitInput = pipe(
  trim,
  split('\n'),
);

const between = curry(
  (minBound, maxBound, value) => and(
    gte(value, minBound),
    lte(value, maxBound),
  ),
);

module.exports = { maxList, splitInput, between };
