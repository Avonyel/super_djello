"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    var boards = [];
    for (let i = 1; i < 4; i++) {
      boards.push({
        title: `My Board ${i}`,
        userId: 1
      });
    }
    return queryInterface.bulkInsert("Boards", boards);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Boards", null, {});
  }
};
