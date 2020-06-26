"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _DeleteAppointmentService = _interopRequireDefault(require("./DeleteAppointmentService"));

var _FakeAppointmentsRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentsRepository"));

var _FakeNotificationsRepository = _interopRequireDefault(require("../../notifications/repositories/fakes/FakeNotificationsRepository"));

var _FakeUsersRepository = _interopRequireDefault(require("../../users/repositories/fakes/FakeUsersRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let deleteAppointment;
let fakeAppointmentsRepository;
let fakeNotificationsRepository;
let fakeUsersRepository;
describe('DeleteAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new _FakeAppointmentsRepository.default();
    fakeNotificationsRepository = new _FakeNotificationsRepository.default();
    fakeUsersRepository = new _FakeUsersRepository.default();
    deleteAppointment = new _DeleteAppointmentService.default(fakeAppointmentsRepository, fakeNotificationsRepository, fakeUsersRepository);
  });
  it('should be able to delete an appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    const user = await fakeUsersRepository.create({
      name: 'Lucas moraes',
      nickname: 'Luquinha',
      email: 'lu@gmail.com',
      password: '123123'
    });
    const appointmentCreated = await fakeAppointmentsRepository.create({
      provider_id: user.id,
      user_id: 'user',
      date: new Date(2020, 4, 10, 13)
    });
    await deleteAppointment.execute({
      user_id: 'user',
      appointment_id: appointmentCreated.id
    });
    expect(404).toBeTruthy();
  });
  it('should not be able to delete an appointment of the other user', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    const user = await fakeUsersRepository.create({
      name: 'Lucas moraes',
      nickname: 'Luquinha',
      email: 'lu@gmail.com',
      password: '123123'
    });
    const appointmentCreated = await fakeAppointmentsRepository.create({
      provider_id: user.id,
      user_id: 'user',
      date: new Date(2020, 4, 10, 13)
    });
    await expect(deleteAppointment.execute({
      user_id: 'user2',
      appointment_id: appointmentCreated.id
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});