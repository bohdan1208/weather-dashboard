import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {
  let pipe: TruncatePipe;

  beforeEach(() => {
    pipe = new TruncatePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should truncate a positive decimal number', () => {
    const result = pipe.transform(123.456);
    expect(result).toBe(123);
  });

  it('should truncate a negative decimal number', () => {
    const result = pipe.transform(-123.456);
    expect(result).toBe(-123);
  });

  it('should return undefined if the input is undefined', () => {
    const result = pipe.transform(undefined);
    expect(result).toBeUndefined();
  });

  it('should return the same integer value if the input is an integer', () => {
    const result = pipe.transform(123);
    expect(result).toBe(123);
  });
});
