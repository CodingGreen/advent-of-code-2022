const { partOne, partTwo } = require('./day3');

const testData = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
`;

test('Part One', () => {
  expect(partOne(testData)).toBe(157);
});

test('Part Two', () => {
  expect(partTwo(testData)).toBe(70);
});
