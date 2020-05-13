import AppError from '../../../shared/errors/AppError';

import DeleteAppointmentService from './DeleteAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import FakeNotificationsRepository from '../../notifications/repositories/fakes/FakeNotificationsRepository';
import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';

let deleteAppointment: DeleteAppointmentService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeUsersRepository: FakeUsersRepository;

describe('DeleteAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    deleteAppointment = new DeleteAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to delete an appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const user = await fakeUsersRepository.create({
      name: 'Lucas moraes',
      nickname: 'Luquinha',
      email: 'lu@gmail.com',
      password: '123123',
    });

    const appointmentCreated = await fakeAppointmentsRepository.create({
      provider_id: user.id,
      user_id: 'user',
      date: new Date(2020, 4, 10, 13),
    });

    await deleteAppointment.execute({
      user_id: 'user',
      appointment_id: appointmentCreated.id,
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
      password: '123123',
    });

    const appointmentCreated = await fakeAppointmentsRepository.create({
      provider_id: user.id,
      user_id: 'user',
      date: new Date(2020, 4, 10, 13),
    });

    await expect(
      deleteAppointment.execute({
        user_id: 'user2',
        appointment_id: appointmentCreated.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
