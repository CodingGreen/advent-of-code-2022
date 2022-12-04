const {
  pipe, map, __, splitAt, innerJoin, equals, apply, head, ifElse, subtract, lt, sum, splitEvery,
  reduce, converge, tail,
} = require('ramda');
const { splitInput } = require('./utils');

function splitInHalf(string) {
  return splitAt(string.length / 2, string);
}

const convertToPriority = pipe(
  (character) => character.charCodeAt(),
  ifElse(
    lt(96),
    subtract(__, 96),
    subtract(__, 38),
  ),
);

const innerJoinAll = converge(
  reduce(
    innerJoin(equals),
  ),
  [head, tail],
);

function partOne(input) {
  return pipe(
    splitInput,
    map(
      pipe(
        splitInHalf,
        apply(innerJoin(equals)),
        head,
        convertToPriority,
      ),
    ),
    sum,
  )(input);
}

function partTwo(input) {
  return pipe(
    splitInput,
    splitEvery(3),
    map(
      pipe(
        innerJoinAll,
        head,
        convertToPriority,
      ),
    ),
    sum,
  )(input);
}

module.exports = { partOne, partTwo };
