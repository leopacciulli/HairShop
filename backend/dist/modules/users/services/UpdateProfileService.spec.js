"use strict";

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _UpdateProfileService = _interopRequireDefault(require("./UpdateProfileService"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeHashProvider;
let updateProfile;
describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    updateProfile = new _UpdateProfileService.default(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Lucas moraes',
      nickname: 'Luqinha',
      email: 'lu@gmail.com',
      password: '123123'
    });
    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Lucas da Silva',
      nickname: 'Luqinha',
      email: 'lusilva@gmail.com'
    });
    expect(updatedUser.name).toBe('Lucas da Silva');
    expect(updatedUser.email).toBe('lusilva@gmail.com');
  });
  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'Lucas moraes',
      nickname: 'Luqinha',
      email: 'lu@gmail.com',
      password: '123123'
    });
    const user = await fakeUsersRepository.create({
      name: 'Lucas moraes',
      nickname: 'Luqinha',
      email: 'teste@gmail.com',
      password: '123123'
    });
    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Lucas da Silva',
      nickname: 'Luqinha',
      email: 'lu@gmail.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Lucas moraes',
      nickname: 'Luqinha',
      email: 'lu@gmail.com',
      password: '123123'
    });
    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Lucas da Silva',
      nickname: 'Luqinha',
      email: 'lusilva@gmail.com',
      old_password: '123123',
      password: '123123'
    });
    expect(updatedUser.password).toBe('123123');
  });
  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Lucas moraes',
      nickname: 'Luqinha',
      email: 'lu@gmail.com',
      password: '123123'
    });
    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Lucas da Silva',
      nickname: 'Luqinha',
      email: 'lusilva@gmail.com',
      password: '123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Lucas moraes',
      nickname: 'Luqinha',
      email: 'lu@gmail.com',
      password: '123123'
    });
    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Lucas da Silva',
      nickname: 'Luqinha',
      email: 'lusilva@gmail.com',
      old_password: '33333',
      password: '123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to update the password with non existing user', async () => {
    await expect(updateProfile.execute({
      user_id: 'non id',
      name: 'Teste',
      nickname: 'Luqinha',
      email: 'teste@gmail.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});