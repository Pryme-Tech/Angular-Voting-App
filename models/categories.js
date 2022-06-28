'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users}) {
      // define association here
      this.belongsTo(users, {foreignKey:'user_id'})
    }
  }
  categories.init({
    votingname: DataTypes.STRING,
    user_id: {
      type: DataTypes.STRING
    },
    categoryname: {
        type: DataTypes.CITEXT
      }
  }, {
    sequelize,
    modelName: 'categories',
  });
  return categories;
};