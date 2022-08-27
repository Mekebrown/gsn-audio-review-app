module.exports = (sequelize, Sequelize) => {
  const Media = sequelize.define("media", {
    media_id: {
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING
    },
    location: {
      type: Sequelize.STRING
    },
    user_id: {
      type: Sequelize.INTEGER
    },
    project_name: {
      type: Sequelize.STRING
    },
    creation_datetime: {
      type: Sequelize.DATE
    },
    read_datetime: {
      type: Sequelize.DATE
    },
    update_datetime: {
      type: Sequelize.DATE
    },
    deletion_datetime: {
      type: Sequelize.DATE
    }
  });

  return Media;
};