const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const bp = require("body-parser");
const fileupload = require("express-fileupload");
const {
  media_upload_query_statement,
  media_query_statement,
  insert_note_query,
  update_note_query,
  notes_query_statement,
  login_query
} = require("./server/database/query_strings.js");
const { Client } = require("pg");
const fs = require("fs");
require("dotenv").config();

app.use(express.json());
app.use(fileupload());
app.use(express.urlencoded({ extended: true }));
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "client", "public")));
app.use(express.static(path.join(__dirname, "files", "logs")));
app.use(cors(require("./server/tools/cors_options")));

const client = new Client({
  connectionString: process.env.DATABASE_URL || process.env.PG_URI_APP,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect()
  .then(() => console.log("Connection has been established successfully."))
  .catch((err) => {
    logger({
      desc: "pg_client_connect",
      req: "client variable: " + JSON.stringify(client) +
        " -|- process.env.PGUSER: " + process.env.PGUSER +
        " -|- process.env.PGHOST: " + process.env.PGHOST +
        " -|- process.env.PGPASSWORD: " + process.env.PGPASSWORD +
        " -|- process.env.PGDATABASE: " + process.env.PGDATABASE +
        " -|- process.env.PGPORT: " + process.env.PGPORT,
      message: err
    });

    console.error("Unable to connect to the database:", err);
  });

const getQueryValues = (queryStatement, params = []) => {
  return new Promise((resolve, reject) => {
    client.query(queryStatement, params, (err, rows) => {
      if (err || rows === undefined) {
        logger({
          desc: "getQueryValues",
          req: "Query statement: " + queryStatement + " -|- Params: " + params,
          res: "Rows: " + JSON.stringify(rows),
          headers: "N/A",
          message: JSON.stringify(err)
        });

        reject(new Error(err));
      } else {
        console.log(rows);
        resolve(rows);
      }
    }
    );
  }
  );
};

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.use(express.static(path.join(__dirname, "client", "build", "static", "js")));
  app.use(express.static(path.join(__dirname, "client", "build", "static", "css")));
}

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

/** 
 * Get login form data. Respond with user id AND all media info.
 * 
 * Component making Axios call: Home
 */
app.post("/api/login", (req, res) => {
  res.status(200).send(`Log in received: ${req.body.username} and ${req.body.password}`);
  // const { username, password } = req.body;

  // const isValid = username !== undefined && password !== undefined
  //   && username !== 0 && password !== 0
  //   && username !== null && password !== null
  //   && username !== "" && password !== ""
  //   && username.match(/[A-Za-z0-9 ,.!-]/g) && !password.match(/[^LTa-z-]/g)
  //   && password.length === 25;

  // if (!isValid) res.status(403).send("Information not accepted");

  // const visitor_role = password === process.env.SECRET_ENTRY_ADMIN_VALUE ?
  //   "admin" : password === process.env.SECRET_ENTRY_REVIEWER_VALUE ?
  //     "reviewer" : null;

  // if (visitor_role) {
  //   const reroute_loc = visitor_role === "reviewer" ?
  //     "/review" : "/admin";

  //   const country_loc = req.rawHeaders[9];
  //   const device_info = req.rawHeaders[22] + " - " + req.rawHeaders[23];

  //   const current_date = new Date();

  //   const login_values = [username, country_loc, device_info, visitor_role, current_date];

  //   getQueryValues(login_query, login_values)
  //     .then((data) => res.status(200).send({ message: "Login info accepted", loc: reroute_loc, user_id: data.rows[0].id }))
  //     .catch((err) => console.log(err));
  // } else {
  //   logger({
  //     desc: "post_homepage_login_check",
  //     req: "Body: " + JSON.stringify(req.body),
  //     res: "N/A",
  //     headers: country_loc + " " + device_info,
  //     message: "N/A"
  //   });

  //   res.status(403).send("Information not accepted");
  // }
});

/**
 * Get type of info. Respond with all data for the type (notes, media, or users)
 * 
 * Component making Axios call: App/Home
 * Component making Axios call: AdminShowAllNotes (type: Notes) - Temporary. Eventually will go through home page
 * Component making Axios call: AdminShowAllUsers (type: User) - Temporary. Eventually will go through home page
 * Component making Axios call: AdminShowAllProjects (type: Media) - Temporary. Eventually will go through home page
 */
app.get("/api/:type", function (req, res) {
  res.status(200).send(`All info for ${req.params.type} sent to front end`);
  // let retrieve_all_media = "SELECT * FROM media;";
  // let retrieve_all_notes = "SELECT * FROM notes;";
  // let dataToSend = {};

  // getQueryValues(retrieve_all_media)
  //   .then((data) => {
  //     dataToSend = data.rows;

  //     return getQueryValues(retrieve_all_notes);
  //   })
  //   .then((data) => {
  //     dataToSend = { ...dataToSend, "totalNotesFromServer": data.rows };

  //     res.status(200).send({ message: "Success", media: dataToSend });
  //   })
  //   .catch((err) => {
  //     logger({
  //       desc: "get_retrieve_info_media_id",
  //       req: "",
  //       res: "N/A",
  //       headers: "N/A",
  //       message: JSON.stringify(err)
  //     });

  //     console.error("Promise rejection error: " + err);

  //     throw err;
  //   });
});

/**
 * Get a type and its id (media, note, user). Respond with that type's data.
 * 
 * Component making Axios call: UserSingleProject (type: Media)
 * Component making Axios call: AdminSingleNote (type: Note)
 * Component making Axios call: AdminSingleProject (type: Media)
 * Component making Axios call: AdminShowSingleUser (type: User)
 */
app.get("/api/:type/:id", (req, res) => {
  res.status(200).send(`${req.params.id} of type ${req.params.type} sent to front end`);
  // const media_id = parseInt(req.params.media_id) ? parseInt(req.params.media_id) : 1;
  // const user_id = 1;
  // let dataToSend = {};

  // getQueryValues(media_query_statement, [media_id])
  //   .then((data) => {
  //     dataToSend = data.rows[0];

  //     return getQueryValues(notes_query_statement, [media_id, user_id]);
  //   })
  //   .then((data) => {
  //     dataToSend = { ...dataToSend, "totalNotesFromServer": data.rows };

  //     res.status(200).send(dataToSend);
  //   })
  //   .catch((err) => {
  //     logger({
  //       desc: "get_usingle_mediaQuery",
  //       req: "media_query_statement: " + media_query_statement + " -|- notes_query_statement: " + notes_query_statement,
  //       res: "N/A",
  //       headers: "N/A",
  //       message: JSON.stringify(err)
  //     });

  //     console.error("Promise rejection error (Media): " + err);

  //     throw err;
  //   });
});

/**
 * Get a media id. Respond with that media's data.
 * 
 * Component making Axios call: App
 */
app.get("/api/retrieve-info/media/:media_id", function (req, res) {
  res.status(200).send(`${req.params.media_id} sent to front end`);
  // let media_id = req.params.media_id;
  // let tbd = "";
  // let dataToSend = {};

  // getQueryValues(tbd, [ media_id ])
  // .then((data) => {
  //   dataToSend = data.rows[0];

  //   return getQueryValues(notes_query_statement, [ media_id, user_id ]);
  // })
  // .then((data) => {
  //   dataToSend = {...dataToSend, "totalNotesFromServer": data.rows};

  // res.status(200).send({ message: "Success", media: media_id });
  // })
  // .catch((err) => {
  //   logger({
  //      desc: "get_retrieve_info_media_id", 
  //     req: "", 
  //     res: "N/A",
  //     headers: "N/A",
  //     message: JSON.stringify(err)
  //   });      

  //   console.error("Promise rejection error (Media): " + err);

  //   throw err;
  // });
});

/**
 * Get a type to create (note or user). Respond with a status code.
 * 
 * Component making Axios call: UserSingleProject (type: note)
 */
app.post("/api/new/:type", (req, res) => {
  res.status(200).send(`${req.params.type} created with info ${req.body.note_body}`);
  // const {
  //   is_note_updated,
  //   note_id,
  //   note_body,
  //   note_timestamp,
  //   media_id,
  //   user_id,
  // } = req.body;

  // const isValid = note_body !== undefined
  //   && note_body !== 0
  //   && note_body !== null
  //   && note_body !== ""
  //   && !note_body.match(/[^A-Za-z0-9 ,:;().!-]/g);

  // if (!isValid) res.status(500).send({ message: "Note not saved" });

  // const converted_datetime = new Date();

  // if (!is_note_updated) {
  //   const insert_values = [
  //     user_id,
  //     media_id,
  //     note_body,
  //     note_timestamp,
  //     converted_datetime,
  //     converted_datetime,
  //     converted_datetime
  //   ];

  //   getQueryValues(insert_note_query, insert_values)
  //     .then(data => {
  //       res.status(200).send({ message: "New note saved", data: { id: data.rows[0].id } });
  //     })
  //     .catch(err => {
  //       logger({
  //         desc: "post_usingle_new_note",
  //         req: "Body: " + JSON.stringify(req.body),
  //         res: "New note not saved",
  //         headers: req.rawHeaders[9] + " -|- " +
  //           req.rawHeaders[13] + " -|- " +
  //           req.rawHeaders[21] + " -|- " +
  //           req.rawHeaders[22] + "-" +
  //           req.rawHeaders[23],
  //         message: JSON.stringify(err)
  //       });

  //       console.log(err);

  //       res.status(500).send({ message: "New note not saved", code: 200 });
  //     });
  // } else {
  //   const update_values = [
  //     note_body,
  //     note_timestamp,
  //     converted_datetime,
  //     converted_datetime,
  //     note_id,
  //     media_id
  //   ];

  //   getQueryValues(update_note_query, update_values)
  //     .then(() => {
  //       res.status(200).send({ message: "Updated note saved" });
  //     })
  //     .catch((err) => {
  //       logger({
  //         desc: "post_usingle_updated_note",
  //         req: req.query,
  //         res: "Updated note not saved",
  //         headers: req.rawHeaders[9] + " -|- " +
  //           req.rawHeaders[13] + " -|- " +
  //           req.rawHeaders[21] + " -|- " +
  //           req.rawHeaders[22] + "-" +
  //           req.rawHeaders[23],
  //         message: err
  //       });

  //       res.status(500).send({ message: "Updated note not saved", code: 200 });
  //     });
  // }
});

/**
 * Get audio upload form data. Respond with status object
 * 
 * Component making Axios call: AdminUploadMedia
 */
app.post("/api/upload", (req, res) => {
  res.status(200).send(`Upload created`);
  // const { fileName, description, mediaType, projectName } = req.body;
  // const { mediaFileToUpload } = req.files;

  // const isValid = mediaFileToUpload !== undefined && projectName !== undefined
  //   && mediaFileToUpload !== 0 && projectName !== 0
  //   && mediaFileToUpload !== null && projectName !== null
  //   && mediaFileToUpload !== "" && projectName !== "";

  // if (!isValid) res.status(500).send({ message: "File upload failed" });

  // const file_directory = __dirname + "/files/";
  // const converted_datetime = new Date();

  // mediaFileToUpload.mv(`${file_directory}${fileName}`, (err) => {
  //   if (err) {
  //     res.status(500).send({ message: "File upload failed", code: 200 });
  //   }

  //   const media_values = [description, fileName, mediaType, projectName, converted_datetime, file_directory, converted_datetime, converted_datetime];

  //   getQueryValues(media_upload_query_statement, media_values)
  //     .then(() => {
  //       res.status(200).send({ message: "File Uploaded" });
  //     })
  //     .catch((err) => {
  //       logger({
  //         desc: "post_media",
  //         req: req.query,
  //         res: "Promise rejection error",
  //         headers: req.rawHeaders[9] + " -|- " +
  //           req.rawHeaders[13] + " -|- " +
  //           req.rawHeaders[21] + " -|- " +
  //           req.rawHeaders[22] + "-" +
  //           req.rawHeaders[23],
  //         message: err
  //       });

  //       console.error("Promise rejection error: " + err);
  //     });
  // });
});

/**
 * Respond with pre-defined password
 * 
 * Component making Axios call: AdminSendPW
 */
app.get("/api/send-pw", (req, res) => {
  res.status(200).send("Password generated");
});

app.delete('/api/:type', (req, res) => {
  res.send('Got a DELETE request');
});

// Fallback route. Respond with default index.html page
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// General error handling
app.use((err, req, res, next) => {
  console.error(err.stack);

  logger({
    desc: "error",
    req: err.stack,
    res: "n/a",
    headers: "n/a",
    message: JSON.stringify(err)
  });

  res.status(500).send('Something broke!').redirect('/login');;
});

const logger = (details) => {
  let current = ((new Date()).toLocaleString()).replace(/\D*/g, "");
  let file_name = `./files/logs/${details.desc}${current}.log`;

  let log_data = {
    message: details.message,
    req: details.req ? details.req : "N/A",
    res: details.res ? details.res : "N/A",
    headers: details.headers ? details.headers : "N/A",
  };

  fs.writeFile(file_name, JSON.stringify(log_data, null, "\t") + "\n===============\n", "utf8", (error, data) => {
    console.log("Write complete"); console.log(error); console.log(data);
  });
};

app.listen(process.env.PORT || 3001, function () {
  console.log(process.env.SERVER_PORT);
});
