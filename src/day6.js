const {
  pipe, aperture, findIndex, countBy, identity, values, add, all, equals,
} = require('ramda');

const hasNoDuplicates = pipe(
  countBy(identity),
  values,
  all(equals(1)),
);

function detectMarker(numberOfDistinctCharacters, input) {
  return pipe(
    aperture(numberOfDistinctCharacters),
    findIndex(hasNoDuplicates),
    add(numberOfDistinctCharacters),
  )(input);
}

function partOne(input) {
  return detectMarker(4, input);
}

function partTwo(input) {
  return detectMarker(14, input);
}

module.exports = { partOne, partTwo };
