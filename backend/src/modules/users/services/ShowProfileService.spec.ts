import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import ShowProfileService from './ShowProfileService';
import AppError from '../../../shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Lucas moraes',
      email: 'lu@gmail.com',
      password: '123123',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('Lucas moraes');
    expect(profile.email).toBe('lu@gmail.com');
  });

  it('should not be able to show the profile from non existing user', async () => {
    expect(
      showProfile.execute({
        user_id: 'non id ',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
