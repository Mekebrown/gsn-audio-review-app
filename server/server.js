// Utilities
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require('cors');
const path = require('path');
const dbPermanent = require('./database');

// Components
const indexRouter =  require("./routes/indexRoute");
/* const adminRouter =  require("./routes/adminRoute");
const adminSingleProjectRouter =  require("./routes/adminSingleProjectRoute");
const allProjectsRouter =  require("./routes/allProjectsRoute");
const notesRouter =  require("./routes/notesRoute");
const userSingleProjectRouter =  require("./routes/userSingleProjectRoute");
const usersRouter =  require("./routes/usersRoute");*/

app.use("/", indexRouter);
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

const details = {
  user: 'root',
  host: 'localhost',
  password: 'rootmysql',
  database: 'gsndb'
}

const conn = mysql.createConnection(details);

// Create and Save a new note
app.post("/usingle", (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Note can not be empty!"
    });
  };  

  const note = req.body.note;
  const noteId = req.body.noteId;
  const userId = req.body.userId;
  const projectName = req.body.projectName;
  const noteContent = req.body.noteContent;
  
  conn.query(
    "INSERT INTO notes (note_id, user_id, project_name, contents, creation_datetime) VALUES (?, ?, ?, ?, ?)",
    [
      req.body.noteId, 
      req.body.userId, 
      req.body.projectName, 
      req.body.noteContent, 
      req.body.creationDateTime
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/usingle", (req, res) => {
  const mediaId = 1; //req.params.media_id;
  let result = [];

  
  console.log(conn);
  conn.query("SELECT * FROM media WHERE media_id = 1", (err, mediaRes) => {
    if (err) {
      console.log(err);
    } else {
      result = [...result, mediaRes];
      console.log("Successfully sent media info");
    }
  });

  conn.query("SELECT * FROM notes WHERE note_id = 1", (err, notesRes) => {
    if (err) {
      console.log(err);
    } else {
      result = [...result, notesRes];
      console.log("Successfully sent notes info");
    }
  });

  res.send(result);
});

app.listen(3001, function() {
    console.log("===Server port 3001===");
});
