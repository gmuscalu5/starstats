'use strict';

module.exports = function (sequelize, DataTypes) {
  var Team = sequelize.define('Team', {
    name: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  });

  Team
    .sync({force: false});

  return Team;
};
