import bcrypt from 'bcryptjs';

import { UserInterface } from '../../src/app/interfaces/UserInterface';

import truncate from '../util/truncate';
import factory from '../factories';

describe('Password encrypt', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able encrypt password with new user created', async () => {
    const user: UserInterface = await factory.create('User', {
      password: '123456',
    });

    const compareHash = await bcrypt.compare('123456', user.password_hash);

    expect(compareHash).toBe(true);
  });

  it('should not be able encrypt password with new user created', async () => {
    const user: UserInterface = await factory.create('User', {
      password: '123456',
    });

    const compareHash = await bcrypt.compare('123123', user.password_hash);

    expect(compareHash).toBe(false);
  });
});
