"use strict";

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _ShowProfileService = _interopRequireDefault(require("./ShowProfileService"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let showProfile;
describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    showProfile = new _ShowProfileService.default(fakeUsersRepository);
  });
  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Lucas moraes',
      nickname: 'Luqinha',
      email: 'lu@gmail.com',
      password: '123123'
    });
    const profile = await showProfile.execute({
      user_id: user.id
    });
    expect(profile.name).toBe('Lucas moraes');
    expect(profile.email).toBe('lu@gmail.com');
  });
  it('should not be able to show the profile from non existing user', async () => {
    expect(showProfile.execute({
      user_id: 'non id '
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});