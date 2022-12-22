const {
  pipe, identity, values, add, equals, cond, always, startsWith, sortBy, init, replace, append, __,
  pair, split, reduce, trim, last, either, converge, assoc, head, map, evolve, fromPairs, pickBy,
  gte, sum, join, ifElse, isEmpty, unfold, find, prop, subtract, lte, T, test, tail, repeat, gt, lt,
  inc, slice, reverse, transpose, tap, unapply,
} = require('ramda');
const { pipeLog } = require('./utils');

function isTreeVisible([visibleTreeCount, tallestTree], tree) {
  return ifElse(
    lt(tallestTree),
    pair(inc(visibleTreeCount)),
    always([visibleTreeCount, tallestTree]),
  )(tree);
}

const countVisibleTreesInLine = pipe(
  init,
  (treeLine) => reduce(isTreeVisible, pair(1, head(treeLine)), tail(treeLine)),
  head,
);

const centralSection = slice(1, -1);

const countVisibleTreesInGrid = converge(unapply(sum), [
  pipe(centralSection, map(countVisibleTreesInLine), pipeLog('LR'), sum),
  pipe(centralSection, map(pipe(reverse, countVisibleTreesInLine)), pipeLog('RL'), sum),
  pipe(transpose, centralSection, map(countVisibleTreesInLine), pipeLog('TB'), sum),
  pipe(transpose, centralSection, map(pipe(reverse, countVisibleTreesInLine)), pipeLog('BT'), sum),
]);

const parseGrid = pipe(trim, split('\n'), map(pipe(split(''), map(Number))));

function partOne(input) {
  return countVisibleTreesInGrid(parseGrid(input));
  // return parseGrid(input);
  // return transpose([[1, 2], [3, 4]]);
}

function partTwo(input) {}

module.exports = { partOne, partTwo };
