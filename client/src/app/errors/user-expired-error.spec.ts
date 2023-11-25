import { UserExpiredError } from './user-expired-error';

describe('UserExpired', () => {
  it('should create an instance', () => {
    expect(new UserExpiredError()).toBeTruthy();
  });
});
