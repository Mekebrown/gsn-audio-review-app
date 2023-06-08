/**
 * The Project model is for information related to each media work.
 * 
 * Table: projects
 * 
 *  id - integer, primary key, serialized
 *  project_name - varchar, not null
 *  project_logo_s3_url - varchar
 *  project_description - varchar
 *  project_created_ts - timestamp, not null, default now()
 *  project_updated_ts - timestamp
 * 
 *  project -> user is only admin
 *  project -> media is one to many
 */
