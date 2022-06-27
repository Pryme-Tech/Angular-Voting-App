'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class candidates extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  candidates.init({
    candidatename: DataTypes.STRING,
    category: DataTypes.STRING,
    votingname: DataTypes.STRING,
    user_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'candidates',
  });
  return candidates;
};