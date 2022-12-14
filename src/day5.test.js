const { partOne, partTwo } = require('./day5');

const testData = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
`;

test('Part One', () => {
  expect(partOne(testData)).toBe('CMZ');
});

test('Part Two', () => {
  expect(partTwo(testData)).toBe('MCD');
});
