'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.belongsTo(models.Users, { // 2. Users 모델에게 N:1 관계 설정을 합니다.
        targetKey: 'userId', // 3. Users 모델의 userId 컬럼을
        foreignKey: 'userId', // 4. Posts 모델의 UserId 컬럼과 연결합니다.
      });

      this.belongsTo(models.News, { // 2. Users 모델에게 N:1 관계 설정을 합니다.
        targetKey: 'newsId', // 3. Users 모델의 userId 컬럼을
        foreignKey: 'newsId', // 4. Posts 모델의 UserId 컬럼과 연결합니다.
      });

      this.hasMany(models.Declaration, { // 2. Posts 모델에게 1:N 관계 설정을 합니다.
        sourceKey: 'commentsId', // 3. Users 모델의 userId 컬럼을
        foreignKey: 'commentsId', // 4. Posts 모델의 UserId 컬럼과 연결합니다.
      });
    }
  }
  Comments.init({
    commentsId: {
      allowNull: false, // NOT NULL
      autoIncrement: true, // AUTO_INCREMENT
      primaryKey: true, // Primary Key (기본키)
      type: DataTypes.INTEGER,
    },
    userId: {
      allowNull: false, // NOT NULL
      type: DataTypes.INTEGER,
    },
    newsId: {
      allowNull: false, // NOT NULL
      type: DataTypes.INTEGER,
    },
    content: {
      allowNull: false, // NOT NULL
      type: DataTypes.STRING,
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
    modelName: 'Comments',
  });
  return Comments;
};