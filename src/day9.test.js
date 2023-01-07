const {
  partOne, partTwo, moveInDirection, moveTail,
} = require('./day9');

const testData = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2
`;

const createState = (headPos, tailPos) => ({
  currentPosition: {
    headPosition: [0, 0], tailPosition: [0, 0], ...headPos, ...tailPos,
  },
  tailPositionHistory: tailPos ? [tailPos.tailPosition] : [],
});

test('Move In Direction', () => {
  expect(moveInDirection('U')(createState({ headPosition: [0, 1] })))
    .toEqual(createState({ headPosition: [0, 2] }, { tailPosition: [0, 1] }));
});

test('Move Tail', () => {
  expect(moveTail(createState({ headPosition: [2, 0] })))
    .toEqual(createState({ headPosition: [2, 0] }, { tailPosition: [1, 0] }));
});

test('Move Tail 2', () => {
  expect(moveTail(createState({ headPosition: [1, 2] })))
    .toEqual(createState({ headPosition: [1, 2] }, { tailPosition: [1, 1] }));
});

test('Part One', () => {
  expect(partOne(testData)).toBe(13);
});

test('Part Two', () => {
  expect(partTwo(testData)).toBe();
});
