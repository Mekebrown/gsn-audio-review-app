// Utilities
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bp = require('body-parser')
require('dotenv').config();

// const dbPermanent = require("./database/db_details");

// Components
// const indexRouter =  require("./routes/indexRoute");
/* const adminRouter =  require("./routes/adminRoute");
const adminSingleProjectRouter =  require("./routes/adminSingleProjectRoute");
const allProjectsRouter =  require("./routes/allProjectsRoute");
const notesRouter =  require("./routes/notesRoute");
const userSingleProjectRouter =  require("./routes/userSingleProjectRoute");
const usersRouter =  require("./routes/usersRoute");*/

// app.use("/", indexRouter);
/* app.use("/admin/", adminRouter);
app.use("/asingle/", adminSingleProjectRouter); // Doesn't work
app.use("/projects/", allProjectsRouter);
app.use("/notes/", notesRouter);
app.use("/usingle/", userSingleProjectRouter);
app.use("/users/", usersRouter);*/

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

const details = {
  host: 'localhost',
  user: 'root',
  password: 'rootmysql',
  database: 'gsndb',
  port: 3306,
  ssl: true,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

const conn = mysql.createConnection(details);

var dataToSend = {};

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

  const user_id = 1; // NEED to load the current user's ID somehow!

  const {
    media_id, note_body, note_id, note_timestamp, current_datetime
  } = req.body;

  const updateQueryValues = [note_body, current_datetime, note_timestamp, current_datetime];

  const insertQueryValues = [user_id, current_datetime, media_id, note_body, current_datetime, note_timestamp, "no"];

  const updateQuery = "UPDATE notes SET " + 
                      "note_body = ?, note_last_retrieved = ?, note_timestamp = ?, note_last_updated = ?, is_deleted = 'no'" + 
                      "WHERE note_id = " + note_id + " AND media_id = " + media_id;

  const insertQuery = "INSERT INTO notes " + 
                      "(user_id, creation_datetime, media_id, note_body, note_last_retrieved, note_timestamp, is_deleted) " + 
                      "VALUES (?, ?, ?, ?, ?, ?, ?)";

  const postNoteQuery = note_id ? updateQuery : insertQuery;
  const postNoteQueryValues = note_id ? updateQueryValues : insertQueryValues;

  getQueryValues(postNoteQuery, postNoteQueryValues)
  .then(() => { res.send("Success"); })
  .catch((err) => console.log(err));
});

app.get("/", (req, res) => {
  res.send("Entered");
});

app.post("/", (req, res) => {
  res.send("Here");
});

app.get("/usingle/:media_id", (req, res) => {
  const mediaId = parseInt(req.params.media_id);

  //media - Only one result; We need the following: media_id, file_name,  file_directory, user_id, project_name, media_desc, and all_note_ids
  let media_query_statement = "SELECT * FROM media WHERE media_id = ?";

  // ratings - Zero or one result; We need the following: thumb_rating_id, media_id, user_id, thumb_rating
  let ratings_query_statement = "SELECT * FROM ratings WHERE media_id = ?";

  // notes - Zero or more results; We need the following: media_id, user_id, note_id, note_last_retrieved, note_body, is_deleted, note_timestamp
  let notes_query_statement = "SELECT note_id, note_body, note_last_retrieved, note_timestamp FROM notes WHERE media_id = ? AND is_deleted = 'no' ORDER BY note_last_retrieved DESC LIMIT 5";
  
  getQueryValues(media_query_statement, [mediaId])
  .then(() => getQueryValues(ratings_query_statement, [mediaId]))
  .then(() => getNotesQueryValues(notes_query_statement, [mediaId]))
  .then((rows) => {
    let tempNotesList = ["I dunno what to", "sent through here so", "this will have to do."];

    dataToSend = {...dataToSend, contents: tempNotesList, totalNotesFromServer: rows};

    res.send(dataToSend);
  })
  .catch((err) => console.log("Promise rejection error: " + err));
});

// old '/audio/:media_id/:file_name/:file_ext/:file_type
app.get('/audio', function(req, res) {
    // const mediaId = req.params.media_id && typeof req.params.media_id === "number" ? req.params.media_id : null;
    // const fileName = req.params.file_name && typeof req.params.file_name === "string" ? req.params.file_name : null;
    // const fileExt = req.params.file_ext && typeof req.params.file_ext === "string" ? req.params.file_ext : null;
    // const fileType = req.params.file_type && typeof req.params.file_type === "string" ? req.params.file_type : null;

    const mediaId = req.body.media_id && typeof req.body.media_id === "number" ? req.body.media_id : null;
    const fileName = req.body.file_name && typeof req.body.file_name === "string" ? req.body.file_name : null;
    const fileExt = req.body.file_ext && typeof req.body.file_ext === "string" ? req.body.file_ext : null;
    const fileType = req.body.file_type && typeof req.body.file_type === "string" ? req.body.file_type : null;

  if (mediaId && fileName && fileExt && fileType) {
    const path = "./media/audio/" + fileName + "." + fileType;
    const stat = fs.statSync(path);
    const fileSize = stat.size;

    const head = {
      'Content-Length': fileSize,
      'Content-Type': fileType,
    };
    
    getQueryValues("SELECT file_name FROM media WHERE media_id = ?", [mediaId])
    .then((results) => {
      console.log({results});
      //res.writeHead(200, head);
      //fs.createReadStream(path).pipe(res);
    })
    .catch((err) => console.log("Promise rejection error: " + err));
  } else console.log("Error: Missing info");
});

app.post("/error", (req, res) => {
  console.log('============error===============' + req.body);
});

app.get('/admin', (req, res) => {
  // Redirect back to the homepage. User not permitted to visit this page directly.
  res.setHeader('Content-Type', 'text/html');
  res.end('<h1>Admin</h1>');
});

app.listen(3001, function() {
  console.log(process.env.SERVER_PORT);
});
