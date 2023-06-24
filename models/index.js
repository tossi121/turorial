const dbConfig = require('../config/db.config.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, dbConfig);

const db = {
  Sequelize,
  sequelize,
  tutorials: require('./tutorial.model.js')(sequelize, Sequelize)
};

module.exports = db;
