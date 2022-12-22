const { partOne, partTwo } = require('./day8');

const testData = `30373
25512
65332
33549
35390
`;

test('Part One', () => {
  expect(partOne(testData)).toBe(21);
});

test('Part Two', () => {
  expect(partTwo(testData)).toBe(8);
});
