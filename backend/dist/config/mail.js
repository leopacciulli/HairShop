"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'equipe@jonasemarcia.com.br',
      // colocar o email configurado no Email Addresses no Amazon SES
      name: 'Jonas e Márcia'
    }
  }
};
exports.default = _default;