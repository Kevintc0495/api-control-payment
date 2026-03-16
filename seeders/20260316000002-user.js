'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const [people] = await queryInterface.sequelize.query(
      "SELECT id FROM Peoples WHERE documentNumber = '12345678'"
    );
    const idPeople = people[0]?.id;

    if (!idPeople) {
      throw new Error("No se encontró el registro en Peoples con documentNumber '12345678'. Ejecuta primero el seeder de people.");
    }

    return queryInterface.bulkInsert('Users', [
      {
        idRole: 1,
        idPeople: idPeople,
        email: 'ktorrescolan@gmail.com',
        password: '1234',
        code: '',
        state: 1,
        userCreate: null,
        userUpdate: null,
        createdAt: '2025-03-11 05:20:26.842',
        updatedAt: '2025-03-11 05:20:26.842',
      },
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Users', { email: 'ktorrescolan@gmail.com' }, {});
  },
};
