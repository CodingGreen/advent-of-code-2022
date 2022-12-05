const {
  pipe, map, split, count, and, or, lte, gte,
} = require('ramda');
const { splitInput, between } = require('./utils');

const createRangePairs = pipe(
  splitInput,
  map(
    pipe(
      split(','),
      map(
        pipe(
          split('-'),
          map(Number),
        ),
      ),
    ),
  ),
);

function isRangeFullyOverlapping([[lowerOne, upperOne], [lowerTwo, upperTwo]]) {
  return or(
    and(lte(lowerOne, lowerTwo), gte(upperOne, upperTwo)),
    and(lte(lowerTwo, lowerOne), gte(upperTwo, upperOne)),
  );
}

function isRangeOverlapping([[lowerOne, upperOne], [lowerTwo, upperTwo]]) {
  return or(
    between(lowerOne, upperOne, lowerTwo),
    between(lowerTwo, upperTwo, lowerOne),
  );
}

function partOne(input) {
  return pipe(
    createRangePairs,
    count(isRangeFullyOverlapping),
  )(input);
}

function partTwo(input) {
  return pipe(
    createRangePairs,
    count(isRangeOverlapping),
  )(input);
}

module.exports = { partOne, partTwo };
