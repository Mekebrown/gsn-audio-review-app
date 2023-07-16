import Sequelize, { DataTypes, Model } from 'sequelize';

import sequelize from "../lib/db-related/seq_connect";

/**
 * @class Media
 * 
 * @classdesc The Media model is for information such as what project the media belongs to.
 * 
 * Instantiate -> Media.build()
 * Create -> Media.create(). Have to add the media id to a project's media ids array.
 * Get all -> Media.findAll(). Have to find their related projects.
 * Get one -> Media.findOne(). Have to find its related project.
 * Update -> Media.update({}, {}) and media.save()
 * Delete -> media.destroy(). Have to find its related project, and delete the media id from its media ids array.
 * Get the media work's notes -> media.getNotesOfMediaWork()
 * Get the media work's accounts -> media.getAccountsWithThisMediaWork()
 * Get the media work's project -> media.getProjectOfMediaWork()
 * "Delete" a media's id in notes and project -> media.deleteMediaIdInNoteProject()

    media -> account is only created by an admin
            but is assigned to zero or more accounts
    media -> notes is zero to many
    media -> project is one to one

* @extends {Model}

* @property {number} id - The media's id.
* @property {number} projectId - The media's project it's set to.
* @property {string} mediaDescription - The media's description.
* @property {string} mediaS3Directory - The media's url endpoint to the S3 file.
* @property {string} mediaS3FileName - The media's file name.
* @property {string} mediaType - The media's type (audio, video, image).
* @property {Date} mediaCreatedTS - The media's created timestamp.
* @property {boolean} [hasMediaMarkers] - Does this have markers saved in a csv file?
* @property {string} [mediaMarkersS3CSVURL] -... if so,  the url to the csv file.
* @property {Date} [mediaUpdatedTS] - The recently-updated media's ts.
* @property {Date} [mediaDeletedTS] - When the media work was (soft) "deleted".
* @property {number[]} [notesIds] - The media's notes ids.
* @property {string[]} [accountsIds] - The media's accounts ids.
*/
class Media extends Model {
    async getAccountsWithThisMediaWork() {
        const account = await sequelize.models.Account.findAll({
            where: {
                id: this.accountsIds
            }
        });
        return account;
    };

    async getProjectOfMediaWork() {
        const project = await sequelize.models.Project.findOne({
            where: {
                id: this.projectId
            }
        });
        return project;
    };

    async getNotesOfMediaWork() {
        const notes = await sequelize.models.Note.findAll({
            where: {
                id: this.notesIds
            }
        });
        return notes;
    };

    async deleteMediaIdInNoteProject() {
        const notes = await sequelize.models.Note.findAll({
            where: {
                id: this.notesIds
            }
        });
        const project = await sequelize.models.Project.findOne({
            where: {
                id: this.projectId
            }
        });
        notes.forEach(async (note) => {
            note.mediaIds = note.mediaIds.filter((id) => id !== this.id);
            await note.save();
        });
        project.mediaIds = project.mediaIds.filter((id) => id !== this.id);
        await project.save();
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
    mediaS3Directory: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mediaS3FileName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mediaType: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'audio'
    },
    mediaCreatedTS: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    hasMediaMarkers: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
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
    mediaDeletedTS: {
        type: DataTypes.DATE,
        allowNull: true
    },
    notesIds: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
        defaultValue: []
    },
    accountsIds: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        allowNull: true,
        defaultValue: []
    },
    fullURL: {
        type: DataTypes.VIRTUAL,
        get() {
            return `${process.env.AWS_URL}/${this.mediaS3Directory}/${this.mediaS3FileName}`;
        },
        set(value) {
            throw new Error('Do not try to set the `fullURL` value!');
        }
    }
}, {
    sequelize,
    paranoid: true,
    modelName: 'Media',
    tableName: 'media',
    timestamps: true,
    updatedAt: 'mediaUpdatedTS',
    createdAt: 'mediaCreatedTS',
    deletedAt: 'mediaDeletedTS',
});

Media.associate = (models) => {
    Media.belongsTo(models.Project);
    Media.belongsToMany(models.Account, { through: "MediaAccount" });
    Media.hasMany(models.Note);
};

export { Media };
