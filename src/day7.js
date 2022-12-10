const {
  pipe, identity, values, add, equals, cond, always, startsWith, sortBy, init, replace, append, __,
  pair, split, reduce, trim, last, either, converge, assoc, head, map, evolve, fromPairs, pickBy,
  gte, sum, join, ifElse, isEmpty, unfold, find, prop, subtract, lte, T,
} = require('ramda');
const { diverge } = require('./utils');

const isCommandToIgnore = either(equals('$ ls'), startsWith('dir'));
const otherwise = T;

function openFolder(currentPath, folderSizes) {
  return pipe(
    replace('$ cd ', ''),
    append(__, currentPath),
    diverge([
      identity,
      pipe(join('/'), assoc(__, 0, folderSizes)),
    ]),
  );
}

const createPaths = ifElse(
  isEmpty,
  always(false),
  diverge([
    join('/'),
    init,
  ]),
);

function folderSizeUpdate(folderSize) {
  return pipe(
    unfold(createPaths),
    map(pair(__, add(folderSize))),
    fromPairs,
    evolve,
  );
}

function addSize(currentPath, folderSizes) {
  return pipe(
    split(' '),
    head,
    Number,
    (folderSize) => folderSizeUpdate(folderSize)(currentPath)(folderSizes),
    pair(currentPath),
  );
}

function sizeCounter([currentPath, folderSizes], inputLine) {
  return cond([
    [isCommandToIgnore, always([currentPath, folderSizes])],
    [equals('$ cd ..'), always([init(currentPath), folderSizes])],
    [startsWith('$ cd'), openFolder(currentPath, folderSizes)],
    [otherwise, addSize(currentPath, folderSizes)],
  ])(inputLine);
}

const calculateFolderSizes = pipe(
  trim,
  split('\n'),
  reduce(sizeCounter, [[], {}]),
  last,
);

const spaceNeeded = pipe(
  prop('/'),
  subtract(__, 40000000),
  lte,
);

const orderFoldersBySize = pipe(
  values,
  sortBy(identity),
);

function partOne(input) {
  return pipe(
    calculateFolderSizes,
    pickBy(gte(100000)),
    values,
    sum,
  )(input);
}

function partTwo(input) {
  return pipe(
    calculateFolderSizes,
    converge(find, [
      spaceNeeded,
      orderFoldersBySize,
    ]),
  )(input);
}

module.exports = { partOne, partTwo };
