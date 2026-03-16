'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('Peoples', [
      {
        idDocumentsType: 1,
        documentNumber: '12345678',
        names: 'Kevin',
        lastName: 'Torres',
        age: '30',
        birthday: '1994-05-15',
        address: 'Av. Siempre',
        cellPhone: '987654321',
        createdAt: '2025-03-11 05:20:26.842',
        updatedAt: '2025-03-11 05:20:26.842',
      },
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Peoples', { documentNumber: '12345678' }, {});
  },
};
