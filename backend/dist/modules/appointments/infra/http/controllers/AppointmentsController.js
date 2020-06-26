"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateAppointmentService = _interopRequireDefault(require("../../../services/CreateAppointmentService"));

var _ListAppointmentsUserService = _interopRequireDefault(require("../../../services/ListAppointmentsUserService"));

var _DeleteAppointmentService = _interopRequireDefault(require("../../../services/DeleteAppointmentService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AppointmentsController {
  async show(request, response) {
    const {
      user_id
    } = request.params;

    const showAppointments = _tsyringe.container.resolve(_ListAppointmentsUserService.default);

    const appointment = await showAppointments.execute({
      user_id
    });
    return response.json(appointment);
  }

  async create(request, response) {
    const user_id = request.user.id;
    const {
      provider_id,
      date
    } = request.body;

    const createAppointment = _tsyringe.container.resolve(_CreateAppointmentService.default);

    const appointment = await createAppointment.execute({
      date,
      provider_id,
      user_id
    });
    return response.json(appointment);
  }

  async delete(request, response) {
    const {
      appointment_id
    } = request.params;
    const {
      user_id
    } = request.body;

    const deleteAppointment = _tsyringe.container.resolve(_DeleteAppointmentService.default);

    const appointment = await deleteAppointment.execute({
      user_id,
      appointment_id
    });
    return response.json(appointment);
  }

}

exports.default = AppointmentsController;