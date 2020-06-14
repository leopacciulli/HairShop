import { injectable, inject } from 'tsyringe';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import IUsersRepository from '../../users/repositories/IUsersRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ListAppointmentsUserService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Appointment[]> {
    const appointments = await this.appointmentsRepository.findAppointmentsFromUserLogged(
      {
        user_id,
      },
    );

    const allUsers = await this.usersRepository.findAllProviders({
      except_user_id: user_id,
    });

    const providers = allUsers.filter(user => user.isProvider)

    appointments.forEach(appointment => {
      providers.forEach(provider => {
        if (appointment.provider_id === provider.id) {
          appointment.provider_name = provider.name
        }
      })
    })

    return appointments;
  }
}

export default ListAppointmentsUserService;
