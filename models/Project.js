import Sequelize, { DataTypes, Model } from 'sequelize';

import sequelize from "../lib/db-related/seq_connect";

/**
 * @class Project
 * 
 * @classdesc The Project model is for information related to each media work.
 * 
 * Instantiate -> Project.build()
 * Create -> Project.create()
 * Get all -> Project.findAll(). Have to find their related media.
 * Get one -> Project.findOne(). Have to find its related media.
 * Update -> Project.update({}, {}) and project.save()
 * Delete -> project.destroy(). Have to find its related media, and delete it all, unless it's to be moved into a new project. The new project has to be made beforehand.
 * 
 *  project -> user is only admin
 *  project -> media is one to many
 * 
 * @extends {Model}
 * 
 * @property {number} id - The project's id.
 * @property {string} projectName - The project's name.
 * @property {Date} projectCreatedTS - The project's created timestamp.
 * @property {string} [projectLogoS3URL] - The project's logo url.
 * @property {string} [projectDescription] - The project's description.
 * @property {Date} [projectUpdatedTS] - The recently-updated project's ts.
 * @property {number[]} [mediaIds] - The project's media ids.
 * @property {number[]} [timersIds] - The project's timer ids.
 */
class Project extends Model {
    async getMediaOfProject() {
        const media = await Media.findAll({
            include: [{
                model: Project,
                where: {
                    id: this.id
                }
            }]
        });

        return media;
    };
}

Project.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    projectName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    projectCreatedTS: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    projectLogoS3URL: {
        type: DataTypes.STRING,
        allowNull: true
    },
    projectDescription: {
        type: DataTypes.STRING,
        allowNull: true
    },
    projectUpdatedTS: {
        type: DataTypes.DATE,
        allowNull: true
    },
    mediaIds: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
        defaultValue: []
    },
    timersIds: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
        defaultValue: []
    }
}, {
    sequelize,
    modelName: 'Project',
    tableName: 'projects',
    timestamps: true,
    updatedAt: 'projectUpdatedTS',
    createdAt: 'projectCreatedTS'
});

Project.associate = (models) => {
    Project.hasMany(models.Media);
    Project.hasMany(models.Timer);
};

export { Project };
