'use strict';
const {  Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.hasMany(models.News, { // 2. Posts 모델에게 1:N 관계 설정을 합니다.
        sourceKey: 'userId', // 3. Users 모델의 userId 컬럼을
        foreignKey: 'UserId', // 4. Posts 모델의 UserId 컬럼과 연결합니다.
      });

      this.hasMany(models.Comments, { // 2. Comments 모델에게 1:N 관계 설정을 합니다.
        sourceKey: 'userId', // 3. Users 모델의 userId 컬럼을
        foreignKey: 'UserId', // 4. Comments 모델의 UserId 컬럼과 연결합니다.
      });

      this.hasMany(models.Declaration, { // 2. Posts 모델에게 1:N 관계 설정을 합니다.
        sourceKey: 'userId', // 3. Users 모델의 userId 컬럼을
        foreignKey: 'dcrUserId', // 4. Posts 모델의 UserId 컬럼과 연결합니다.
      });
    }
  }
  Users.init({
    userId: {
      allowNull: false, // NOT NULL
      autoIncrement: true, // AUTO_INCREMENT
      primaryKey: true, // Primary Key (기본키)
      type: DataTypes.INTEGER,
    },
    id: {
      allowNull: false, // NOT NULL
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      allowNull: false, // NOT NULL
      type: DataTypes.STRING,
    },
    name: {
      allowNull: false, // NOT NULL
      type: DataTypes.STRING,
    },
    message: {
      allowNull: true,  // NULL
      type: DataTypes.STRING,
    },
    nickname: {
      allowNull: false, // NOT NULL
      type: DataTypes.STRING,
      unique: true,
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
    modelName: 'Users',
  });
  return Users;
};