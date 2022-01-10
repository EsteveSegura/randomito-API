const randomFloat = require('../useCases/randomFloat');

describe('RandomFloat', () => {
  it('should return a random float', () => {
    const generateRandomFloat = randomFloat.randomFloat();

    expect(typeof generateRandomFloat).toBe('number');
    expect(generateRandomFloat <= 1).toEqual(true);
    expect(generateRandomFloat >= 0).toEqual(true);
    expect(generateRandomFloat).not.toBe(null);
  });
});
