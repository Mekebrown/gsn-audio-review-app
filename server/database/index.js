const dbConfig = require('./db_details');
const Sequelize = require("sequelize");

const {details, queryDatabase} = dbConfig;

const sequelize = new Sequelize(details.database, details.user, details.password, {
  host: details.host,
  dialect: details.dialect,
  operatorsAliases: false,
  pool: {
    max: details.pool.max,
    min: details.pool.min,
    acquire: details.pool.acquire,
    idle: details.pool.idle
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.tutorials = require("./notes.model.js")(sequelize, Sequelize);

module.exports = db;