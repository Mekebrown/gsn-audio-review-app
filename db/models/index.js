const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('../sequelize');
const db = {};

const basename = path.basename(__filename);
const models_in_dir = fs.readdirSync(__dirname);
const model_names = models_in_dir.filter((file) => file !== basename && file.slice(-3) === '.js');

model_names.forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);

    db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
