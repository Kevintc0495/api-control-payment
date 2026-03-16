'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    return queryInterface.bulkInsert('Roles', [
      {
        name: 'Administrador',
        state: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Cajero',
        state: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, _) {
    return queryInterface.bulkDelete('Role', null, {});
  }
};
