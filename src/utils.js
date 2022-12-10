const {
  reduce, head, max, pipe, trim, split, curry, gte, and, lte, tap, converge, unapply, identity,
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

const pipeLog = (message) => tap((value) => console.log(message, value));

const diverge = converge(unapply(identity));

module.exports = {
  maxList, splitInput, between, pipeLog, diverge,
};
