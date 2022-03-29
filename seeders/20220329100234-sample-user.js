'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return await queryInterface.bulkInsert('Users', [
      {
        name: 'Taro',
        pass: 'yamada',
        mail: 'taro@yamada.jp',
        age: 39,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Hanako',
        pass: 'flower',
        mail: 'hanako@flower.com',
        age: 28,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jiro',
        pass: 'change',
        mail: 'jiro@change.com',
        age: 17,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sachiko',
        pass: 'happy',
        mail: 'sachiko@happy.jp',
        age: 39,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return await queryInterface.bulkDelete('Users', null, {});
  }
};
