"use strict";

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _FakeUsersRepository = _interopRequireDefault(require("../../users/repositories/fakes/FakeUsersRepository"));

var _ListProvidersService = _interopRequireDefault(require("./ListProvidersService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let listProviders;
let fakeCacheProvider;
describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    listProviders = new _ListProvidersService.default(fakeUsersRepository, fakeCacheProvider);
  });
  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Lucas moraes',
      nickname: 'Luquinha',
      email: 'lu@gmail.com',
      password: '123123'
    });
    const user2 = await fakeUsersRepository.create({
      name: 'Lucas silva',
      nickname: 'Luquinha',
      email: 'lusilva@gmail.com',
      password: '123123'
    });
    const loggedUser = await fakeUsersRepository.create({
      name: 'Lucas logado',
      nickname: 'Luquinha',
      email: 'lulogado@gmail.com',
      password: '123123'
    });
    const providers = await listProviders.execute({
      user_id: loggedUser.id
    });
    expect(providers).toEqual([user1, user2]);
  });
});