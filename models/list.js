const models = require("./");

("use strict");
module.exports = (sequelize, DataTypes) => {
  var List = sequelize.define("List", {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    boardId: DataTypes.INTEGER,
    boardIndex: DataTypes.INTEGER
  });

  List.associate = function(models) {
    List.hasMany(models.Card, { foreignKey: "listId" });
    List.belongsTo(models.Board, { foreignKey: "boardId" });
  };
  return List;
};
