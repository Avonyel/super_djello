"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    var cards = [];
    var list = 0;
    for (let i = 0; i < 30; i++) {
      if (i % 5 === 0) {
        list += 1;
      }
      cards.push({
        title: `Card ${i}`,
        description:
          "That really urgent thing you've been avoiding for weeks because it means diving into the snarl of legacy code, but you really can't put it off anymore.",
        listId: list,
        listIndex: i % 5,
        completed: false
      });
    }
    return queryInterface.bulkInsert("Cards", cards);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Cards", null, {});
  }
};
