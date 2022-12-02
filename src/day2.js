const {
  split, pipe, map, trim, sum, __, prop,
} = require('ramda');

const movesCombinationPointsMap = {
  'A X': 4,
  'A Y': 8,
  'A Z': 3,
  'B X': 1,
  'B Y': 5,
  'B Z': 9,
  'C X': 7,
  'C Y': 2,
  'C Z': 6,
};

const resultCombinationPointsMap = {
  'A X': 3,
  'A Y': 4,
  'A Z': 8,
  'B X': 1,
  'B Y': 5,
  'B Z': 9,
  'C X': 2,
  'C Y': 6,
  'C Z': 7,
};

const parseInput = pipe(
  trim,
  split('\n'),
);

const mapToPoints = (combinationPointsMap) => map(
  prop(__, combinationPointsMap),
);

function partOne(input) {
  return pipe(
    parseInput,
    mapToPoints(movesCombinationPointsMap),
    sum,
  )(input);
}

function partTwo(input) {
  return pipe(
    parseInput,
    mapToPoints(resultCombinationPointsMap),
    sum,
  )(input);
}

module.exports = { partOne, partTwo };
