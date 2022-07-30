// Utilities
const express = require("express");
const app = express();
const cors = require('cors');
const path = require('path');
const bp = require('body-parser');
const { Sequelize, DataTypes, Op } = require("sequelize");
const fileupload = require("express-fileupload");
const {
  media_upload_query_statement,
  media_query_statement,
  ratings_query_statement,
  notes_query_statement,
  notes_query_statement_insert,
  notes_query_statement_update,
  media_query_statement_retrieval,
  media_query_statement_insert
} = require("./server/database/query_strings.js");
const { Pool } = require('pg');
const fs = require("fs");
require('dotenv').config();

app.use(express.json());
app.use(fileupload());
app.use(express.urlencoded({ extended: true }));
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'client', 'public')));
app.use(express.static('./files'));
app.use(express.static('./files/logs'));
app.use(cors(require("./server/tools/cors_options")));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false, 
  }
);

sequelize.authenticate()
.then(() => console.log('Connection has been established successfully.'))
.catch((err) => {  
  logger({ 
    location: "sequelize_auth",
    req: "sequelize variable: " + sequelize + 
          "| process.env.DB_DATABASE: " + process.env.DB_DATABASE + 
          "| process.env.DB_USERNAME: " + process.env.DB_USERNAME + 
          "| process.env.DB_PASSWORD: " + process.env.DB_PASSWORD +
          "| process.env.DB_HOST: " + process.env.DB_HOST,
    message: err 
  });
  
  console.error('Unable to connect to the database:', err); 
});

const isProduction = process.env.NODE_ENV === "production";

if (isProduction) {
  app.use(express.static("client/build"));

  app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });
} else {  
  let dataToSend = {}; // Let to allow overwriting later

  const User = sequelize.define('User', {
    id:               { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_name:        { type: DataTypes.STRING, allowNull: false },
    last_visited:     { type: DataTypes.DATE, allowNull: false },
    role:             { type: DataTypes.STRING, allowNull: false, defaultValue: "guest" },
    note_ids_created: { type: DataTypes.STRING, allowNull: true },
    email:            { type: DataTypes.STRING, allowNull: true },
  });

  const Note = sequelize.define('Note', {
    id:               { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id:          { type: DataTypes.INTEGER, allowNull: false },
    media_id:         { type: DataTypes.INTEGER, allowNull: false },
    note_body:        { type: DataTypes.STRING(5000), allowNull: false },
    timestamp:        { type: DataTypes.STRING, allowNull: false },
    last_retrieved:   { type: DataTypes.DATE, allowNull: true }
  });

  const Media = sequelize.define('Media', {
    id:               { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    file_name:        { type: DataTypes.STRING, allowNull: false },
    file_directory:   { type: DataTypes.STRING(5000), allowNull: false },
    user_id:          { type: DataTypes.INTEGER, allowNull: false },
    media_type:       { type: DataTypes.STRING, allowNull: false, defaultValue: "audio" },
    project_name:     { type: DataTypes.STRING, allowNull: true },
    media_desc:       { type: DataTypes.STRING, allowNull: true },
  });

  sequelize.sync();

  const getQueryValues = (queryStatement, params = []) => {
    return new Promise((resolve, reject) => {
      conn.query(queryStatement, params, (err, rows) => {                                                
          if (err || rows === undefined) {
            logger({
              location: "getQueryValues", 
              req: "Query statement: " + queryStatement + "| Params: " + params, 
              res: "Rows: " + rows,
              message: err
            });

            reject(new Error(err));
          } else {
            dataToSend = {...dataToSend, ...rows[0]};
            resolve(rows);
          }
        }
      )}
    );
  };
  
  const getNotesQueryValues = (queryStatement, params = []) => {
    return new Promise((resolve, reject) => {
      conn.query(queryStatement, params, (err, rows) => {                                                
          if (err || rows === undefined) {
            logger({
              location: "getNotesQueryValues", 
              req: "Query statement: " + queryStatement + "| Params: " + params, 
              res: "Rows: " + rows,
              message: err
            });
            reject(new Error(err));
          } else {
            resolve(rows);
          }
        }
      )}
    );
  };

  app.get("/usingle", (req, res) => {
    const mediaId = parseInt(req.query.media_id) ? parseInt(req.query.media_id) : 1;

    const userId = 1;

    Media.findOne({
      where: {
        id: mediaId
      }
    })
    .then((res) => dataToSend = {...dataToSend, ...res.dataValues})
    .catch((err) => {      
      logger({
        location: "get_usingle_mediaQuery", 
        req: req.query, 
        res: "Promise rejection error (Media)",
        headers: req.rawHeaders[9] + "|" + 
                  req.rawHeaders[13] + "|" + 
                  req.rawHeaders[21] + "|" + 
                  req.rawHeaders[22] + "-" + 
                  req.rawHeaders[23],
        message: err
      });
      
      console.error("Promise rejection error (Media): " + err); });

    Note.findAll({
      order: [
        ["updatedAt", "DESC"]
      ],
      where: {
        [Op.and]: [
          {media_id: mediaId},
          {user_id: userId},
        ]
      }
    })
    .then((res) => dataToSend = {...dataToSend, ...res.dataValues})
    .then(() => res.send(dataToSend))
    .catch((err) => {
      logger({
        location: "get_usingle_noteQuery", 
        req: req.query, 
        res: "Promise rejection error (Note)",
        headers: req.rawHeaders[9] + "|" + 
                  req.rawHeaders[13] + "|" + 
                  req.rawHeaders[21] + "|" + 
                  req.rawHeaders[22] + "-" + 
                  req.rawHeaders[23],
        message: err
      });
      
      console.error("Promise rejection error (Note): " + err); });
  });

  app.post("/usingle", (req, res) => {
    const {
      is_note_updated,
      note_body,            // notes: The written note
      note_timestamp,       // notes: Timestamp
      media_id,             // notes and media: media id
      user_id,               // notes and users: user id
    } = req.body;

    let note_id_to_work_with = note_id ? note_id : null;

    let converted_datetime = new Date();
    
    const new_notes_query_values = {
      note_body,
      converted_datetime,
      note_timestamp,
      converted_datetime,
      user_id, 
      media_id,
      converted_datetime,
     };

     const updated_notes_query_values = {
      note_body,
      converted_datetime, 
      note_timestamp, 
      converted_datetime,
      note_id_to_work_with
     };
    
    if (!is_note_updated) {
      const new_note = Note.build(new_notes_query_values);

      new_note.save()
      .then((mysql_now) => converted_datetime = mysql_now[0]["NOW()"])
      .then(() => getNotesQueryValues(`INSERT INTO notes (note_body, note_last_updated, note_timestamp, note_last_retrieved, user_id, media_id, note_created_on) VALUES (?, ?, ?, ?, ?, ?, ?)`, [ note_body, converted_datetime, note_timestamp, converted_datetime, user_id, media_id, converted_datetime]))
      .then(() => getNotesQueryValues("SELECT note_id, note_last_updated FROM notes WHERE note_last_updated = ? LIMIT 1", [converted_datetime]))
      .then((note_info_retrieved_from_query) => note_id_to_work_with = note_info_retrieved_from_query[0].note_id)
      .catch((err) => {
        logger({
          location: "post_usingle", 
          req: req.query, 
          res: "Note not saved",
          headers: req.rawHeaders[9] + "|" + 
                    req.rawHeaders[13] + "|" + 
                    req.rawHeaders[21] + "|" + 
                    req.rawHeaders[22] + "-" + 
                    req.rawHeaders[23],
          message: err
        }); 
        
        res.status(500).send({ message: "Note not saved", code: 200 }); 
      });
    } else {
      getNotesQueryValues(`UPDATE notes SET note_body = ?, note_last_updated = ?, note_timestamp = ?, note_last_retrieved = ? WHERE note_id = ?`, [note_body, converted_datetime, note_timestamp, converted_datetime, note_id_to_work_with])
      .catch((err) => {
        logger({
          location: "post_usingle_getNotesQueryValues", 
          req: req.query, 
          res: "Note not saved",
          headers: req.rawHeaders[9] + "|" + 
                    req.rawHeaders[13] + "|" + 
                    req.rawHeaders[21] + "|" + 
                    req.rawHeaders[22] + "-" + 
                    req.rawHeaders[23],
          message: err
        });
        
        res.status(500).send({ message: "Note not saved", code: 200 }); 
      });
    }
  });

  app.post("/media", (req, res) => {
    const { fileName, description, mediaType, projectName } = req.body;
    const { mediaFileToUpload } = req.files;

    const file_directory = __dirname + "/files/";
    const user_id = 1;

    mediaFileToUpload.mv(`${file_directory}${fileName}`, (err) => {
      if (err) {
        res.status(500).send({ message: "File upload failed", code: 200 });
      }
      
      const media = Media.build({
        file_name: fileName,
        file_directory: file_directory,
        user_id: user_id,
        media_type: mediaType,
        project_name: projectName,
        media_desc: description
      });
      
      media.save()
      .then(() => {
        res.status(200).send({ message: "File Uploaded", code: 200 });
      })
      .catch((err) => {
        logger({
          location: "post_media", 
          req: req.query, 
          res: "Promise rejection error",
          headers: req.rawHeaders[9] + "|" + 
                    req.rawHeaders[13] + "|" + 
                    req.rawHeaders[21] + "|" + 
                    req.rawHeaders[22] + "-" + 
                    req.rawHeaders[23],
          message: err
        });
        
        console.error("Promise rejection error: " + err) 
      });
    });
  });
}

const logger = (details) => {
  let current = ((new Date()).toLocaleString()).replace(/\D*/g, "");
  let file_name = `${details.location}_${current}.log`;

  let log_data = {
    message: details.message,
    req: details.req ? details.req : "N/A",
    res: details.res ? details.res : "N/A",
    headers: details.headers ? details.headers : "N/A",
  };

  fs.writeFile(file_name, JSON.stringify(log_data, null, '\t') + "\n===============\n", "utf8", (error, data) => {
    console.log("Write complete"); console.log(error); console.log(data); 
  });
};

app.listen(process.env.PORT || 3001, function() {
  console.log(process.env.SERVER_PORT);
});
