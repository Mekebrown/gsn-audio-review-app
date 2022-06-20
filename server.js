// Utilities
const express = require("express");
const app = express();
const cors = require('cors');
const path = require('path');
const bp = require('body-parser');

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'client', 'public')));
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

const isProduction = process.env.NODE_ENV === "production";

if (isProduction) {
  app.use(express.static("/client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
} else {
  const mysql = require("mysql");
  const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  });
  
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

  app.get("/usingle/:media_id", (req, res) => {
    const mediaId = parseInt(req.params.media_id);
  
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
  });
}

app.listen(process.env.PORT || 3001, function() {
  console.log(process.env.SERVER_PORT);
});
