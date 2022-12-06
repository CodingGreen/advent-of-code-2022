const {
  split, pipe, head, init, map, splitEvery, transpose, nth, trim, match, zipObj, filter, isNil, not,
  compose, useWith, apply, reduce, adjust, dec, evolve, repeat, join, slice, remove, concat,
} = require('ramda');

const notEmptySlot = compose(not, isNil);

const parseCrates = pipe(
  split('\n'),
  init,
  map(splitEvery(4)),
  transpose,
  map(pipe(
    map(pipe(
      match(/[A-Z]/),
      head,
    )),
    filter(notEmptySlot),
  )),
);

const parseInstructions = pipe(
  trim,
  split('\n'),
  map(pipe(
    match(/\d+/g),
    zipObj(['numberOfCrates', 'fromStack', 'toStack']),
    evolve({
      fromStack: dec,
      toStack: dec,
    }),
  )),
);

function moveCrates(numberOfCrates) {
  return (stackState, { fromStack, toStack }) => pipe(
    adjust(toStack, concat(slice(0, numberOfCrates, nth(fromStack, stackState)))),
    adjust(fromStack, remove(0, numberOfCrates)),
  )(stackState);
}

function crateMover9000(stackState, instruction) {
  return reduce(moveCrates(1), stackState, repeat(instruction, instruction.numberOfCrates));
}

function crateMover9001(stackState, instruction) {
  return moveCrates(instruction.numberOfCrates)(stackState, instruction);
}

function parseAndOperate(crateMover) {
  return apply(useWith(reduce(crateMover), [parseCrates, parseInstructions]));
}

const topCrates = pipe(
  map(head),
  join(''),
);

function partOne(input) {
  return pipe(
    split('\n\n'),
    parseAndOperate(crateMover9000),
    topCrates,
  )(input);
}

function partTwo(input) {
  return pipe(
    split('\n\n'),
    parseAndOperate(crateMover9001),
    topCrates,
  )(input);
}

module.exports = { partOne, partTwo };
