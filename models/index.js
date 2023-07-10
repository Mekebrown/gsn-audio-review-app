'use strict';

import Sequelize from 'sequelize';

import sequelize from "../lib/db-related/seq_connect";

const db = {};

const make_db = () => {
import("./Media")
.then(media => {
  db["Media"] = media;

  return import("./Note");
})
.then(note => {
  db["Note"] = note;

  return import("./Project");
})
.then(project => {
  db["Project"] = project;

  return import("./Signin");
})
.then(signin => {
  db["Signin"] = signin;

  return import("./Timer");
})
.then(timer => {
  db["Timer"] = timer;

  return import("./User");
})
.then(user => {
  db["User"] = user;

  return db;
})
.then(db => {
  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  return db;
})
.then(db => {
  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
})
.catch(err => {
  console.error(err);
});
};

make_db();

export default db;
