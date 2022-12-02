const { partOne, partTwo } = require('./day2');

const testData = `A Y
B X
C Z
`;

test('Part One', () => {
  expect(partOne(testData)).toBe(15);
});

test('Part Two', () => {
  expect(partTwo(testData)).toBe(12);
});
