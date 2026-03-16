'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _) {
    return queryInterface.bulkInsert('Banks', [
      {
        name: 'Banco de crédito',
        account: '225-564154-45456465',
        cci: '00-001-225-564154-45456465',
        state: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Interbank',
        account: '225-564154-45456465',
        cci: '00-001-225-564154-45456465',
        state: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Scotiabnak',
        account: '225-564154-45456465',
        cci: '00-001-225-564154-45456465',
        state: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, _) {
    return queryInterface.bulkDelete('Banks', null, {});
  }
};
