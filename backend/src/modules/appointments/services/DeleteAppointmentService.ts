import { injectable, inject } from 'tsyringe';
import { format } from 'date-fns';

import AppError from '../../../shared/errors/AppError';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import INotificationsRepository from '../../notifications/repositories/INotificationsRepository';
import IUsersRepository from '../../users/repositories/IUsersRepository';

interface IRequest {
  appointment_id: string;
  user_id: string;
}

@injectable()
class DeleteAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
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

    const user = await this.usersRepository.findById(user_id);

    const providersData = await this.usersRepository.findAllProviders({
      except_user_id: user_id,
    });

    const provider = providersData.filter(
      prov => prov.id === appointment.provider_id,
    )[0];

    const dateFormated = format(appointment.date, "dd/MM/yyyy 'às' HH:mm'h'");

    await this.notificationsRepository.create({
      recipient_id: appointment.provider_id,
      content: `O cliente ${user.nickname} cancelou o agendamento do dia ${dateFormated} com ${provider.name}`,
    });

    await this.appointmentsRepository.delete({ appointment_id });
  }
}

export default DeleteAppointmentService;
