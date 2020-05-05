import { Router } from 'express';

import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;

/**
 * ANOTATIONS:
 *
 * SoC: Separation Of Concerns (separação de preocupações)
 *
 * DTO: Data Transfer Object
 *
 * S: Single Responsability Principle: Cada classe com sua única responsabilidade
 * O: Open Closed Principle:
 * L: Liskov Substitution Principle: Definir conjunto de regras para camadas que se integram com libs
 * I: Interface Segregation Principle:
 * D: Dependency Invertion: recebe a classe repository como parâmetro no constructor do service
 */
