// Utilities
const express = require("express");
const app = express();
const cors = require('cors');
const path = require('path');
const bp = require('body-parser');
const { Sequelize, DataTypes, Model } = require("sequelize");
const fileupload = require("express-fileupload");

require('dotenv').config();

app.use(express.json());
app.use(fileupload());
app.use(express.urlencoded({ extended: true }));
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'client', 'public')));
app.use(express.static('files'));

try {
  const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD, 
    {
      host: process.env.DB_HOST,
      dialect: 'postgres'
    }
  );

  sequelize.authenticate();

  console.log('Connection has been established successfully.');

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
    last_retrieved:   { type: DataTypes.DATE, allowNull: true },
    last_updated:     { type: DataTypes.DATE, allowNull: true },
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

  const admin = User.build({
    user_name: "admin",
    last_visited: DataTypes.NOW,
  });

  const note = Note.build({
    user_id: 1,
    media_id: 1001,
    note_body: "This will be the first note!",
    timestamp: "00:00",
  });
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const corsOptions = {
  origin: (origin, callback) => {
    console.log("** Origin of request " + origin);

    if (allowList.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable");
      callback(null, true);
    } else {
      console.log(allowList.indexOf(origin));
      callback(new Error("Not allowed by CORS"));
    }
  }
};

app.use(cors(corsOptions));

const isProduction = process.env.NODE_ENV === "production";

if (isProduction) {
  app.use(express.static(path.join(__dirname, "client/build")));
  
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
} else {  
  let dataToSend = {}; // Let to allow overwriting later
  
  const getQueryValues = (queryStatement, params = []) => {
    return new Promise((resolve, reject) => {
      conn.query(queryStatement, params, (err, rows) => {                                                
          if (err || rows === undefined) {
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
  
    const media_query_statement = "SELECT * FROM media WHERE media_id = ?";
    const ratings_query_statement = "SELECT * FROM ratings WHERE media_id = ?";
    const notes_query_statement = `SELECT 
                                  note_id, note_body, note_last_updated, note_timestamp, note_last_retrieved, note_is_deleted
                                  FROM notes 
                                  WHERE media_id = ? 
                                  AND note_is_deleted = 'no' 
                                  ORDER BY note_last_retrieved 
                                  DESC 
                                  LIMIT 5
    `;
    
    getQueryValues(media_query_statement, [mediaId])
    .then(() => getQueryValues(ratings_query_statement, [mediaId]))
    .then(() => getNotesQueryValues(notes_query_statement, [mediaId]))
    .then((rows) => {
      dataToSend = {...dataToSend, totalNotesFromServer: rows};

      res.send(dataToSend);
    })
    .catch((err) => console.log("Promise rejection error: " + err));
  });

  app.post("/usingle", (req, res) => {   
    let note_id_to_work_with = req.body.note_id ? req.body.note_id : null;

    const {
      is_note_updated,
      note_body,            // notes: The written note
      note_timestamp,       // notes: Timestamp
      media_id,             // notes and media: media id
      user_id,               // notes and users: user id
    } = req.body;

    let converted_datetime = new Date();
    
    const notes_query_values = !is_note_updated ? [
      note_body,
      converted_datetime,
      note_timestamp,
      converted_datetime,
      user_id, 
      media_id,
      converted_datetime,
    ] : [
      note_body,
      converted_datetime, 
      note_timestamp, 
      converted_datetime,
      note_id_to_work_with
    ];

    let notes_query_statement = !is_note_updated ? `INSERT INTO notes (
                                                    note_body, note_last_updated, note_timestamp, note_last_retrieved, user_id, media_id, note_created_on) VALUES (?, ?, ?, ?, ?, ?, ?)` : 
    `UPDATE notes 
    SET
    note_body = ?, note_last_updated = ?, note_timestamp = ?, note_last_retrieved = ?
    WHERE note_id = ?`;

    let media_query_statement_retrieval = "SELECT notes_for_this_media FROM media WHERE media_id = ?";
    
    let media_query_statement_insert = "INSERT INTO media (notes_for_this_media) VALUES (?) WHERE media_id = ?";
    
    if (!is_note_updated) {
      getNotesQueryValues('SELECT NOW()', [])
      .then((mysql_now) => converted_datetime = mysql_now[0]["NOW()"])
      .then(() => getNotesQueryValues(`INSERT INTO notes (note_body, note_last_updated, note_timestamp, note_last_retrieved, user_id, media_id, note_created_on) VALUES (?, ?, ?, ?, ?, ?, ?)`, [ note_body, converted_datetime, note_timestamp, converted_datetime, user_id, media_id, converted_datetime]))
      .then(() => getNotesQueryValues("SELECT note_id, note_last_updated FROM notes WHERE note_last_updated = ? LIMIT 1", [converted_datetime]))
      .then((note_info_retrieved_from_query) => note_id_to_work_with = note_info_retrieved_from_query[0].note_id)
      .catch(() => res.status(500).send({ message: "Note not saved", code: 200 }));
    } else {
      getNotesQueryValues(`UPDATE notes SET note_body = ?, note_last_updated = ?, note_timestamp = ?, note_last_retrieved = ? WHERE note_id = ?`, [note_body, converted_datetime, note_timestamp, converted_datetime, note_id_to_work_with])
      .catch((err) => res.status(500).send({ message: "Note not saved", code: 200 }));
    }
  });

  app.post("/media", (req, res) => {
    const { fileName, description, mediaType, projectName } = req.body;
    const { mediaFileToUpload } = req.files;

    const file_directory = __dirname + "/files/";
    const media_uploaded_on =  new Date();
    const user_id = 1;

    mediaFileToUpload.mv(`${file_directory}${fileName}`, (err) => {
      if (err) {
        res.status(500).send({ message: "File upload failed", code: 200 });
      }

      const media_upload_query_values = [
        user_id, 
        description, 
        fileName, 
        mediaType, 
        projectName, 
        media_uploaded_on, 
        "test"
      ]; // getQueryValues(media_upload_query_statement, media_upload_query_values)
      
      const media = Media.build({
      });
      
      media.save()
      .then(() => {
        res.status(200).send({ message: "File Uploaded", code: 200 });
      })
      .catch((err) => console.log("Promise rejection error: " + err));
      });
  });
}

app.listen(process.env.PORT || 3001, function() {
  console.log(process.env.SERVER_PORT);
});
