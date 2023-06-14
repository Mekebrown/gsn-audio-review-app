const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = require('../sequelize');

/**
 * @class Media
 * 
 * @classdesc The Media model is for information such as what project the media belongs to.
 * 
 * Instantiate -> Media.build()
 * Create -> Media.create(). Have to add the mediaId to a project's mediaIds array.
 * Get all -> Media.findAll(). Have to find their related projects.
 * Get one -> Media.findOne(). Have to find its related project.
 * Update -> Media.update({}, {}) and media.save()
 * Delete -> media.destroy(). Have to find its related project, and delete the mediaId from its mediaIds array.
 * Get the media work's notes -> media.getNotesOfMediaWork()
 * Get the media work's users -> media.getUsersOfMediaWork()
 * Get the media work's project -> media.getProjectOfMediaWork()

    media -> user is only created by an admin
            but is assigned to zero or more users
    media -> notes is zero to many
    media -> project is one to one

 * @extends {Model}
 
 * @property {number} mediaId - The media's id.
 * @property {number} projectId - The media's project it's set to.
 * @property {string} mediaDescription - The media's description.
 * @property {string} mediaType - The media's type (audio, video, image).
 * @property {string} mediaS3URL - The media's url to the S3 file.
 * @property {Date} mediaCreatedTS - The media's created timestamp.
 * @property {boolean} [hasMediaMarkers] - Does this have markers saved in a csv file?
 * @property {string} [mediaMarkersS3CSVURL] -... if so,  the url to the csv file.
 * @property {Date} [mediaUpdatedTS] - The recently-updated media's ts.
 * @property {number[]} [notesIds] - The media's notes ids.
 * @property {number[]} [usersIds] - The media's users ids.
*/
class Media extends Model {
    getUsersOfMediaWork = async (mediaId) => {
        const users = await User.findAll({
            include: [{
                model: Media,
                where: {
                    mediaId: mediaId
                }
            }]
        });

        return users;
    };

    getProjectOfMediaWork = async (mediaId) => {
        const project = await Project.findOne({
            include: [{
                model: Media,
                where: {
                    mediaId: mediaId
                }
            }]
        });

        return project;
    };

    getNotesOfMediaWork = async (mediaId) => {
        const notes = await Note.findAll({
            include: [{
                model: Media,
                where: {
                    mediaId: mediaId
                }
            }]
        });

        return notes;
    };
}

Media.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    projectId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    mediaDescription: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mediaS3URL: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mediaCreatedTS: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    mediaType: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'audio'
    },
    hasMediaMarkers: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    mediaMarkersS3CSVURL: {
        type: DataTypes.STRING,
        allowNull: true
    },
    mediaUpdatedTS: {
        type: DataTypes.DATE,
        allowNull: true
    },
    notesIds: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
        defaultValue: "{}"
    },
    usersIds: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
        defaultValue: "{}"
    }
}, {
    sequelize,
    modelName: 'Media',
    tableName: 'media',
    timestamps: true
});

Media.associate = (models) => {
    Media.belongsTo(models.Project, {
        foreignKey: 'projectId'
    });

    Media.belongsToMany(models.User, {
        foreignKey: 'mediaId',
        otherKey: 'userId'
    });

    Media.belongsToMany(models.Note, {
        foreignKey: 'mediaId',
        otherKey: 'noteId'
    });
};

module.exports = Media;
