import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import DeleteAppointmentService from './DeleteAppointmentService';
import AppError from '../../../shared/errors/AppError';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let deleteAppointment: DeleteAppointmentService;

describe('DeleteAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    deleteAppointment = new DeleteAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to delete an appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointmentCreated = await fakeAppointmentsRepository.create({
      provider_id: 'userid',
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

    const appointmentCreated = await fakeAppointmentsRepository.create({
      provider_id: 'userid',
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
