const { DataTypes, Model } = require('sequelize');

const sequelize = require('../sequelize');

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
 * @property {number} project_id - The project's id.
 * @property {string} project_name - The project's name.
 * @property {Date} project_created_ts - The project's created timestamp.
 * @property {string} [project_logo_s3_url] - The project's logo url.
 * @property {string} [project_description] - The project's description.
 * @property {Date} [project_updated_ts] - The recently-updated project's ts.
 * @property {number[]} [media_ids] - The project's media ids.
 */
class Project extends Model {
    getMediaOfProject = async (project_id) => {
        const media = await Media.findAll({
            include: [{
                model: Project,
                where: {
                    project_id: project_id
                }
            }]
        });

        return media;
    };
}

Project.init({
    projectId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'project_id'
    },
    projectName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'project_name'
    },
    projectCreatedTS: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'project_created_ts'
    },
    projectLogoS3URL: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'project_logo_s3_url'
    },
    projectDescription: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'project_description'
    },
    projectUpdatedTS: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
        field: 'project_updated_ts'
    },
    mediaIds: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
        field: 'media_ids'
    }
}, {
    sequelize,
    modelName: 'Project',
    tableName: 'projects',
    timestamps: true,
    createdAt: 'project_created_ts',
    updatedAt: 'project_updated_ts',
    underscored: true,
});

module.exports = Project;
