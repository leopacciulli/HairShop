"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _dateFns = require("date-fns");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IAppointmentsRepository = _interopRequireDefault(require("../repositories/IAppointmentsRepository"));

var _INotificationsRepository = _interopRequireDefault(require("../../notifications/repositories/INotificationsRepository"));

var _IUsersRepository = _interopRequireDefault(require("../../users/repositories/IUsersRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let DeleteAppointmentService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('AppointmentsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('NotificationsRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IAppointmentsRepository.default === "undefined" ? Object : _IAppointmentsRepository.default, typeof _INotificationsRepository.default === "undefined" ? Object : _INotificationsRepository.default, typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class DeleteAppointmentService {
  constructor(appointmentsRepository, notificationsRepository, usersRepository) {
    this.appointmentsRepository = appointmentsRepository;
    this.notificationsRepository = notificationsRepository;
    this.usersRepository = usersRepository;
  }

  async execute({
    user_id,
    appointment_id
  }) {
    const appointments = await this.appointmentsRepository.findAppointmentsFromUserLogged({
      user_id
    });
    const appointment = appointments.find(my_appointment => my_appointment.id === appointment_id);

    if (!appointment) {
      throw new _AppError.default('Appointment does not existis.');
    }

    const user = await this.usersRepository.findById(user_id);
    const providersData = await this.usersRepository.findAllProviders({
      except_user_id: user_id
    });
    const provider = providersData.filter(prov => prov.id === appointment.provider_id)[0];
    const dateFormated = (0, _dateFns.format)(appointment.date, "dd/MM/yyyy 'às' HH:mm'h'");
    await this.notificationsRepository.create({
      recipient_id: appointment.provider_id,
      content: `O cliente ${user.nickname} cancelou o agendamento do dia ${dateFormated} com ${provider.name}`
    });
    await this.appointmentsRepository.delete({
      appointment_id
    });
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
var _default = DeleteAppointmentService;
exports.default = _default;