import Sequelize from 'sequelize';

import { Profile } from "./Profile";
import { Media } from "./Media";
import { Note } from "./Note";
import { Project } from "./Project";
import { Timer } from "./Timer";
import sequelize from "../lib/db-related/seq_connect";

const db = {
  sequelize,
  Sequelize
};

db["Profile"] = Profile;
db["Media"] = Media;
db["Note"] = Note;
db["Project"] = Project;
db["Timer"] = Timer;

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;
