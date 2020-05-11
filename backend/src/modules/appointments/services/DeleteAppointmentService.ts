import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  appointment_id: string;
  user_id: string;
}

@injectable()
class DeleteAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({ user_id, appointment_id }: IRequest): Promise<void> {
    const appointments = await this.appointmentsRepository.findAppointmentsFromUserLogged(
      {
        user_id,
      },
    );

    const appointment = appointments.find(
      my_appointment => my_appointment.id === appointment_id,
    );

    if (!appointment) {
      throw new AppError('Appointment does not existis.');
    }

    await this.appointmentsRepository.delete({ appointment_id });
  }
}

export default DeleteAppointmentService;
