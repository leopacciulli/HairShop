"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticated"));

var _AppointmentsController = _interopRequireDefault(require("../controllers/AppointmentsController"));

var _ProviderAppointmentsController = _interopRequireDefault(require("../controllers/ProviderAppointmentsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const appointmentsRouter = (0, _express.Router)();
const appointmentsController = new _AppointmentsController.default();
const providerAppointmentsController = new _ProviderAppointmentsController.default();
appointmentsRouter.use(_ensureAuthenticated.default);
appointmentsRouter.get('/my/:user_id', appointmentsController.show);
appointmentsRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    provider_id: _celebrate.Joi.string().uuid().required(),
    date: _celebrate.Joi.date()
  }
}), appointmentsController.create);
appointmentsRouter.get('/me', providerAppointmentsController.index);
appointmentsRouter.delete('/:appointment_id', appointmentsController.delete);
var _default = appointmentsRouter;
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

exports.default = _default;