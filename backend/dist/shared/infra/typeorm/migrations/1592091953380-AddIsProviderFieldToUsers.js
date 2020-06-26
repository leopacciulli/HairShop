"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddIsProviderFieldToUsers1592091953380 = void 0;

var _typeorm = require("typeorm");

class AddIsProviderFieldToUsers1592091953380 {
  async up(queryRunner) {
    await queryRunner.addColumn('users', new _typeorm.TableColumn({
      name: 'isProvider',
      type: 'boolean',
      isNullable: true
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropColumn('users', 'isProvider');
  }

}

exports.AddIsProviderFieldToUsers1592091953380 = AddIsProviderFieldToUsers1592091953380;