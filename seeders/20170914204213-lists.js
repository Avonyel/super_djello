"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    var lists = [];
    var board = 0;
    for (let i = 0; i < 6; i++) {
      if (i % 2 === 0) {
        board += 1;
      }
      lists.push({
        title: `List ${i}`,
        description: "I'm just a list, yes I'm only a list.",
        boardId: board,
        boardIndex: i % 2
      });
    }
    return queryInterface.bulkInsert("Lists", lists);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Lists", null, {});
  }
};
