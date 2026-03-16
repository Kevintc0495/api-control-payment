'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    return queryInterface.bulkInsert('PaymentStatus', [
      {
        name: 'Pagado',
        state: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Anulado',
        state: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down (queryInterface, _) {
    return queryInterface.bulkDelete('PaymentStatus', null, {});
  }
};
