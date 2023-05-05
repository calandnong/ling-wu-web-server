import { ErrorMiddleware } from './error.middleware';

describe('ErrorMiddleware', () => {
  it('should be defined', () => {
    expect(new ErrorMiddleware()).toBeDefined();
  });
});
