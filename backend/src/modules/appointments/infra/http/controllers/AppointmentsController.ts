import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAppointmentService from '../../../services/CreateAppointmentService';
import ListAppointmentsUserService from '../../../services/ListAppointmentsUserService';
import DeleteAppointmentService from '../../../services/DeleteAppointmentService';

export default class AppointmentsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const showAppointments = container.resolve(ListAppointmentsUserService);

    const appointment = await showAppointments.execute({
      user_id
    });

    return response.json(appointment);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { provider_id, date } = request.body;

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      date,
      provider_id,
      user_id,
    });

    return response.json(appointment);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { appointment_id } = request.params;
    const { user_id } = request.body;

    const deleteAppointment = container.resolve(DeleteAppointmentService);

    const appointment = await deleteAppointment.execute({
      user_id,
      appointment_id,
    });

    return response.json(appointment);
  }
}
