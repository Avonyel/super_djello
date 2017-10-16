"use strict";

const bcrypt = require("bcrypt");
const faker = require("faker");

module.exports = {
  up: function(queryInterface, Sequelize) {
    var users = [];
    for (let i = 0; i < 10; i++) {
      users.push({
        email: `me${i}@gmail.com`,
        username: faker.internet.userName(),
        password: bcrypt.hashSync("password", 12)
      });
    }
    return queryInterface.bulkInsert("Users", users);
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
