const {
  split, pipe, map, trim, sum, sortBy, identity, takeLast,
} = require('ramda');
const { maxList } = require('./utils');

const sumElvesCalories = pipe(
  trim,
  split('\n\n'),
  map(
    pipe(
      split('\n'),
      sum,
    ),
  ),
);

function partOne(input) {
  return pipe(
    sumElvesCalories,
    maxList,
  )(input);
}

function partTwo(input) {
  return pipe(
    sumElvesCalories,
    sortBy(identity),
    takeLast(3),
    sum,
  )(input);
}

module.exports = { partOne, partTwo };
