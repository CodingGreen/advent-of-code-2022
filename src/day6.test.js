const { partOne, partTwo } = require('./day6');

describe.each([
  ['mjqjpqmgbljsphdztnvjfqwrcgsmlb', 7, 19],
  ['bvwbjplbgvbhsrlpgdmjqwftvncz', 5, 23],
  ['nppdvjthqldpwncqszvftbrmjlhg', 6, 23],
  ['nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 10, 29],
  ['zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 11, 26],
])('Test Case %#', (input, partOneExpectedOutput, partTwoExpectedOutput) => {
  test('Part One', () => {
    expect(partOne(input)).toBe(partOneExpectedOutput);
  });

  test('Part Two', () => {
    expect(partTwo(input)).toBe(partTwoExpectedOutput);
  });
});
