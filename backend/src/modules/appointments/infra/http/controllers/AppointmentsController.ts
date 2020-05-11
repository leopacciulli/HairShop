import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '../../../services/CreateAppointmentService';
import DeleteAppointmentService from '../../../services/DeleteAppointmentService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      date: parsedDate,
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
