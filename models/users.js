'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({categories}) {
      // define association here
      this.hasMany(categories, {foreignKey:'user_id'})
    }
  }
  users.init({
    username: {
      type : DataTypes.CITEXT,
      unique : true
    },
    password: DataTypes.STRING,
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    }
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};