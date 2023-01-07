const {
  pipe, split, trim, map, lensProp, inc, over, dec, prop, zipWith, subtract, __, lensIndex, view,
  all, clamp, add, set, range, zipObj, evolve, reduce, lensPath, append, uniq, length, ifElse,
  always,
} = require('ramda');
const { between } = require('./utils');

const xLens = lensIndex(0);
const yLens = lensIndex(1);

const movementActions = {
  U: over(yLens, inc),
  D: over(yLens, dec),
  R: over(xLens, inc),
  L: over(xLens, dec),
};

const getMovementAction = prop(__, movementActions);

const coordinateDifference = zipWith(subtract);
const coordinateAdd = zipWith(add);

const parseInstructions = pipe(
  trim,
  split('\n'),
  map(pipe(
    split(' '),
    zipObj(['direction', 'numberOfSteps']),
    evolve({ numberOfSteps: Number }),
  )),
);

const headPositionLens = lensPath(['currentPosition', 'headPosition']);
const tailPositionLens = lensPath(['currentPosition', 'tailPosition']);
const tailPositionHistoryLens = lensProp('tailPositionHistory');

const withinTouchingDistance = between(-1, 1);

const clampCoordinates = map(clamp(-1, 1));

const moveTail = (state) => {
  const tailPosition = view(tailPositionLens, state);
  const diff = coordinateDifference(view(headPositionLens, state), tailPosition);
  const newTailPosition = ifElse(
    all(withinTouchingDistance),
    always(tailPosition),
    pipe(clampCoordinates, coordinateAdd(tailPosition)),
  )(diff);
  return pipe(
    set(tailPositionLens, newTailPosition),
    over(tailPositionHistoryLens, append(newTailPosition)),
  )(state);
};

const moveInDirection = (direction) => {
  const movementAction = getMovementAction(direction);
  return pipe(
    over(headPositionLens, movementAction),
    moveTail,
  );
};

const processAction = (state, action) => {
  const move = moveInDirection(prop('direction', action));
  return reduce(move, state, range(0, prop('numberOfSteps', action)));
};

function partOne(input) {
  return pipe(
    parseInstructions,
    reduce(
      processAction,
      { currentPosition: { headPosition: [0, 0], tailPosition: [0, 0] }, tailPositionHistory: [] },
    ),
    view(tailPositionHistoryLens),
    uniq,
    length,
  )(input);
}

function partTwo(input) {

}

module.exports = {
  partOne, partTwo, moveInDirection, moveTail,
};
