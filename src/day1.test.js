const { partOne, partTwo } = require('./day1');

const testData = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
`;

test('Part One', () => {
  expect(partOne(testData)).toBe(24000);
});

test('Part Two', () => {
  expect(partTwo(testData)).toBe(45000);
});
