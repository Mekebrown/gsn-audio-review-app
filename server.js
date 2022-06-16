// Utilities
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require('cors');
const path = require('path');
const bp = require('body-parser');

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') {
  const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
  });
}

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

// Create and Save a new note
app.post("/usingle", (req, res) => {
  if (!req.body) { res.status(400).send({ message: "Note cannot be empty!" }); };  

  const user_id = 1001; // NEED to load the current user's ID somehow!

  const {
    media_id, note_body, note_id, note_timestamp, current_datetime
  } = req.body;

  const updateQueryValues = [note_body, current_datetime, note_timestamp, current_datetime];

  const insertQueryValues = [user_id, current_datetime, media_id, note_body, current_datetime, note_timestamp, "no"];

  const updateQuery = "UPDATE notes SET " + 
                      "note_body = ?, note_last_retrieved = ?, note_timestamp = ?, note_last_updated = ?, note_is_deleted = 'no'" + 
                      "WHERE note_id = " + note_id + " AND media_id = " + media_id;

  const insertQuery = "INSERT INTO notes " + 
                      "(user_id, creation_datetime, media_id, note_body, note_last_retrieved, note_timestamp, note_is_deleted) " + 
                      "VALUES (?, ?, ?, ?, ?, ?, ?)";

  const postNoteQuery = note_id ? updateQuery : insertQuery;
  const postNoteQueryValues = note_id ? updateQueryValues : insertQueryValues;

  getQueryValues(postNoteQuery, postNoteQueryValues)
  .then(() => { res.send("Success"); })
  .catch((err) => console.log(err));
});

app.post("/", (req, res) => {
  res.send("Cool");
});

app.get("/usingle/:media_id", (req, res) => {
  const mediaId = parseInt(req.params.media_id);

  if (process.env.NODE_ENV === 'production') {
    const someInfo = {
      creation_datetime: "2022-03-23T21:37:22.000Z",
      file_directory: "media/audio",
      file_name: "t.mp3",
      media_deleted_on: null,
      media_desc: "The file t.mp3 is an audio track that is the current GSN theme song.",
      media_id: 1,
      media_last_retrieved: null,
      media_type: "audio",
      media_updated_on: null,
      media_uploaded_on: "2022-06-10T19:11:53.000Z",
      project_name: "t.mp3",
      read_datetime: null,
      thumb_rating: "up",
      thumb_rating_id: 1,
      totalNotesFromServer: [
          {
              note_body: "The whole track is great. Thanks, Lance.",
              note_id: 12,
              note_is_deleted: "no",
              note_last_retrieved: "2022-06-10T20:11:53.000Z",
              note_last_updated: null,
              note_timestamp: "14.25"
          }
      ],
      update_datetime: null,
      user_id: 1
    }

    res.send(someInfo);
  } else {
    //media - Only one result; We need the following: media_id, file_name,  file_directory, user_id, project_name, media_desc, and all_note_ids
    let media_query_statement = "SELECT * FROM media WHERE media_id = ?";

    // ratings - Zero or one result; We need the following: thumb_rating_id, media_id, user_id, thumb_rating
    let ratings_query_statement = "SELECT * FROM ratings WHERE media_id = ?";

    // notes - Zero or more results; We need the following: media_id, user_id, note_id, note_last_updated, note_last_retrieved, note_body, note_timestamp
    let notes_query_statement = `SELECT 
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
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(process.env.PORT || 3001, function() {
  console.log(process.env.SERVER_PORT);
});
