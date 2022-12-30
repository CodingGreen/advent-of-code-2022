const {
  pipe, add, __, split, trim, map, prop, subtract, repeat, gt, slice, range, sequence, of, path,
  all, nth, anyPass, count, multiply, lte, length, product, reverse, findIndex, equals, always,
  ifElse,
} = require('ramda');
const { maxList } = require('./utils');

const createCoordinatesForInnerSquare = pipe(
  prop('length'),
  subtract(__, 1),
  range(1),
  repeat(__, 2),
  sequence(of),
);

const parseGrid = pipe(
  trim,
  split('\n'),
  map(pipe(
    split(''),
    map(Number),
  )),
);

const obstructed = pipe(
  gt,
  all,
);

function getWestTrees(grid) {
  return ([y, x]) => reverse(slice(0, x, nth(y, grid)));
}

function getEastTrees(grid) {
  return ([y, x]) => slice(add(x, 1), Infinity, nth(y, grid));
}

function getNorthTrees(grid) {
  return ([y, x]) => reverse(map(nth(x), slice(0, y, grid)));
}

function getSouthTrees(grid) {
  return ([y, x]) => map(nth(x), slice(add(y, 1), Infinity, grid));
}

function isTreeVisible(grid) {
  return (coordinates) => anyPass([
    () => obstructed(path(coordinates, grid))(getWestTrees(grid)(coordinates)),
    () => obstructed(path(coordinates, grid))(getEastTrees(grid)(coordinates)),
    () => obstructed(path(coordinates, grid))(getNorthTrees(grid)(coordinates)),
    () => obstructed(path(coordinates, grid))(getSouthTrees(grid)(coordinates)),
  ])();
}

const viewingDistance = (treeHeight) => (treeLine) => pipe(
  findIndex(lte(treeHeight)),
  ifElse(equals(-1), always(length(treeLine)), add(1)),
)(treeLine);

const getDirectionsForGrid = (grid) => (coordinates) => [
  getWestTrees(grid)(coordinates),
  getEastTrees(grid)(coordinates),
  getNorthTrees(grid)(coordinates),
  getSouthTrees(grid)(coordinates),
];

function scenicScore(grid) {
  const getDirections = getDirectionsForGrid(grid);
  return (coordinates) => {
    const treeHeight = path(coordinates, grid);
    const directions = getDirections(coordinates);
    return product(map(viewingDistance(treeHeight), directions));
  };
}

function partOne(input) {
  const grid = parseGrid(input);
  const coordinates = createCoordinatesForInnerSquare(grid);
  return add(
    subtract(multiply(length(grid), 4), 4),
    count(isTreeVisible(grid), coordinates),
  );
}

function partTwo(input) {
  const grid = parseGrid(input);
  const coordinates = createCoordinatesForInnerSquare(grid);
  return maxList(map(scenicScore(grid), coordinates));
}

module.exports = { partOne, partTwo };
