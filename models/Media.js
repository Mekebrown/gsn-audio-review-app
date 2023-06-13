const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = require('../sequelize');

/**
 * @class Media
 * 
 * @classdesc The Media model is for information such as what project the media belongs to.
 * 
 * Instantiate -> Media.build()
 * Create -> Media.create(). Have to add the media_id to a project's media_ids array.
 * Get all -> Media.findAll(). Have to find their related projects.
 * Get one -> Media.findOne(). Have to find its related project.
 * Update -> Media.update({}, {}) and media.save()
 * Delete -> media.destroy(). Have to find its related project, and delete the media_id from its media_ids array.
 * Get the media work's notes -> media.getNotesOfMediaWork()
 * Get the media work's users -> media.getUsersOfMediaWork()
 * Get the media work's project -> media.getProjectOfMediaWork()

    media -> user is only created by an admin
            but is assigned to zero or more users
    media -> notes is zero to many
    media -> project is one to one

 * @extends {Model}
 
 * @property {number} media_id - The media's id.
 * @property {number} project_id - The media's project it's set to.
 * @property {string} media_description - The media's description.
 * @property {string} media_type - The media's type (audio, video, image).
 * @property {string} media_s3_url - The media's url to the S3 file.
 * @property {Date} media_created_ts - The media's created timestamp.
 * @property {boolean} [has_media_markers] - Does this have markers saved in a csv file?
 * @property {string} [media_markers_s3_csv_url] -... if so,  the url to the csv file.
 * @property {Date} [media_updated_ts] - The recently-updated media's ts.
 * @property {number[]} [notes_ids] - The media's notes ids.
 * @property {number[]} [users_ids] - The media's users ids.
*/
class Media extends Model {
    getUsersOfMediaWork = async (media_id) => {
        const users = await User.findAll({
            include: [{
                model: Media,
                where: {
                    media_id: media_id
                }
            }]
        });

        return users;
    };

    getProjectOfMediaWork = async (media_id) => {
        const project = await Project.findOne({
            include: [{
                model: Media,
                where: {
                    media_id: media_id
                }
            }]
        });

        return project;
    };

    getNotesOfMediaWork = async (media_id) => {
        const notes = await Note.findAll({
            include: [{
                model: Media,
                where: {
                    media_id: media_id
                }
            }]
        });

        return notes;
    };
}

Media.init({
    mediaId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'media_id'
    },
    projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'project_id'
    },
    mediaDescription: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'media_description'
    },
    mediaS3URL: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'media_s3_url'
    },
    mediaCreatedTS: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        field: 'media_created_ts'
    },
    mediaType: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'audio',
        field: 'media_type'
    },
    hasMediaMarkers: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'has_media_markers'
    },
    mediaMarkersS3CSVURL: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'media_markers_s3_csv_url'
    },
    mediaUpdatedTS: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'media_updated_ts'
    },
    notesIds: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
        defaultValue: "{}",
        field: 'notes_ids'
    },
    usersIds: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
        defaultValue: "{}",
        field: 'users_ids'
    }
}, {
    sequelize,
    modelName: 'Media',
    tableName: 'media',
    timestamps: true,
    createdAt: 'media_created_ts',
    updatedAt: 'media_updated_ts',
    underscored: true,
});

Media.associate = (models) => {
    Media.belongsTo(models.Project, {
        foreignKey: 'project_id'
    });

    Media.belongsToMany(models.User, {
        through: 'media_users',
        foreignKey: 'media_id',
        otherKey: 'user_id'
    });

    Media.belongsToMany(models.Note, {
        through: 'media_notes',
        foreignKey: 'media_id',
        otherKey: 'note_id'
    });
};

module.exports = Media;
