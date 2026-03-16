'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _) {
    return queryInterface.bulkInsert('DocumentsType', [
      {
        name: 'Dni',
        state: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Carnet extranjeria',
        state: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, _) {
    return queryInterface.bulkDelete('DocumentsType', null, {});
  }
};
