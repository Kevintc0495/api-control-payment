'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    return queryInterface.bulkInsert('PaymentTypes', [
      {
        name: 'Efectivo',
        state: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Transferencia bancaria',
        state: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Yape',
        state: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Plin',
        state: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, _) {
    return queryInterface.bulkDelete('PaymentType', null, {});
  }
};
