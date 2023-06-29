'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Declaration extends Model {
    static associate(models) {
      this.belongsTo(models.Users, {
        targetKey: 'userId',
        foreignKey: 'dcrUserId',
      });

      this.belongsTo(models.Comments, {
        targetKey: 'commentsId',
        foreignKey: 'commentsId',
      });
    }
  }

  Declaration.init(
    {
      declarationId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      commentsId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      content: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      dcrUserId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Declaration',
    }
  );

  return Declaration;
};
