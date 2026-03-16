'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    return queryInterface.bulkInsert('Headquarters', [
      {
        name: 'Sede 1',
        address: "Cal. Cesar Morelli 181 - Lima",
        state: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sede 2',
        address: "Cal. Cesar Morelli 181 - Limaral",
        state: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, _) {
    return queryInterface.bulkDelete('Headquarters', null, {});
  }
};