'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Declaration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
  Declaration.init({
    declarationId: {
      allowNull: false, // NOT NULL
      autoIncrement: true, // AUTO_INCREMENT
      primaryKey: true, // Primary Key (기본키)
      type: DataTypes.INTEGER,
    },
    commentsId: {
      allowNull: false, // NOT NULL
      type: DataTypes.INTEGER,
    },
    content: {
      allowNull: false, // NOT NULL
      type: DataTypes.STRING,
    },
    dcrUserId: {
      allowNull: false, // NOT NULL
      type: DataTypes.INTEGER,
    },
    createdAt: {
      allowNull: false, // NOT NULL
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      allowNull: false, // NOT NULL
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'Declaration',
  });
  return Declaration;
};