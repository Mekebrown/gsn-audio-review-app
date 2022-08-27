module.exports = (sequelize, Sequelize) => {
  const Notes = sequelize.define("notes", {
    note_id: {
      type: Sequelize.INTEGER
    },
    user_id: {
      type: Sequelize.INTEGER
    },
    creation_datetime: {
      type: Sequelize.DATE
    },
    project_name: {
      type: Sequelize.STRING
    },
    contents: {
      type: Sequelize.STRING
    }
  });

  return Notes;
};