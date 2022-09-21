const router = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const { body, validationResult } = require("express-validator");
const { client } = require("../tools/client_passport");

const {
    media_upload_query_statement,
    media_query_statement,
    insert_note_query,
    update_note_query,
    notes_query_statement,
    login_query,
    set_pw_query
} = require("../database/query_strings");
const { setMediaStorage } = require("../tools/server_helpers");

require("dotenv").config();

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
                resolve(rows);
            }
        });
    });
};

/** 
 * Get login form data. Respond with user id AND all media info.
 * 
 * Component making Axios call: Home
 */
router.post("/login",
    // body('username').trim().escape().not().isEmpty()
    //     .withMessage('Username cannot be empty')
    //     .isLength({ min: 5 })
    //     .withMessage('Username must be five or more characters long')
    //     .isLength({ max: 25 })
    //     .withMessage('Username must be up to 25 characters long'),
    // body('password').trim().escape().not().isEmpty()
    //     .withMessage('Password cannot be empty')
    //     .matches(/[LTa-z-]/g)
    //     .withMessage('Password not correct'),
    passport.authenticate('local'), //          admin@email.enter        aLotmosdef-behemoth-souls
    (req, res, next) => {
        // const errors = validationResult(req);

        // if (!errors.isEmpty()) {
        //     logger({
        //         desc: "validate_login",
        //         req: "Body: " + JSON.stringify(req.body),
        //         res: "N/A - Sent a 400",
        //         headers: req.rawHeaders[9] + " -|- " +
        //             req.rawHeaders[13] + " -|- " +
        //             req.rawHeaders[21] + " -|- " +
        //             req.rawHeaders[22] + "-" +
        //             req.rawHeaders[23],
        //         message: JSON.stringify(errors)
        //     });

        //     return res.status(400).json({ errors: errors.array() });
        // }

        const { username, password } = req.body;

        res.status(200).send(`Information accepted`);
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
    }
);

/**
* Get type of info. Respond with all data for the type (notes, media, or users)
* 
* Component making Axios call: App/Home
* Component making Axios call: AdminShowAllNotes (type: Notes) - Temporary. Eventually will go through home page
* Component making Axios call: AdminShowAllUsers (type: User) - Temporary. Eventually will go through home page
* Component making Axios call: AdminShowAllProjects (type: Media) - Temporary. Eventually will go through home page
*/
router.get("/:type", function (req, res, next) {
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
router.get("/:type/:id", (req, res, next) => {
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
router.get("/retrieve-info/media/:media_id", function (req, res, next) {
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
* Create a note. Respond with a status code.
* 
* Component making Axios call: UserSingleProject
*/
router.post("/new-note",
    body('is_note_updated').trim().escape().not().isEmpty().toBoolean(),
    body('note_timestamp').trim().escape().not().isEmpty(),
    body('note_id').trim().escape().not().isEmpty().matches(/\d/g).toInt(),
    body('media_id').trim().escape().not().isEmpty().matches(/\d/g).toInt(),
    body('user_id').trim().escape().not().isEmpty().matches(/\d/g).toInt(),
    body('note_body').trim().escape().not().isEmpty()
        .withMessage('Note cannot be empty')
        .isLength({ min: 5 })
        .withMessage('Note has to say something')
        .isLength({ max: 500 })
        .withMessage('Note contents too large. Consider writing an email.'),
    async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            logger({
                desc: "validate_new_" + req.params.type,
                req: "Body: " + JSON.stringify(req.body),
                res: "N/A - Sent a 400",
                headers: req.rawHeaders[9] + " -|- " +
                    req.rawHeaders[13] + " -|- " +
                    req.rawHeaders[21] + " -|- " +
                    req.rawHeaders[22] + "-" +
                    req.rawHeaders[23],
                message: JSON.stringify(errors)
            });

            return res.status(400).json({ errors: errors.array() });
        }
        res.status(200).send(`${req.params.type} created with info ${req.body.note_body}`);
        // const {
        //   is_note_updated,
        //   note_id,
        //   note_body,
        //   note_timestamp,
        //   media_id,
        //   user_id,
        // } = req.body;

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
    }
);

/**
* Get audio upload form data. Respond with status object
* 
* Component making Axios call: AdminUploadMedia
*/
router.post("/upload",
    body('fileName').trim().escape().not().isEmpty(),
    body('description').trim().escape().not().isEmpty(),
    body('mediaType').trim().escape().not().isEmpty(),
    body('projectName').trim().escape().not().isEmpty(),
    body('imageName').trim().escape().not().isEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            logger({
                desc: "validate_upload",
                req: "Body: " + JSON.stringify(req.body),
                res: "N/A - Sent a 400",
                headers: req.rawHeaders[9] + " -|- " +
                    req.rawHeaders[13] + " -|- " +
                    req.rawHeaders[21] + " -|- " +
                    req.rawHeaders[22] + "-" +
                    req.rawHeaders[23],
                message: JSON.stringify(errors)
            });

            return res.status(400).json({ errors: errors.array() });
        }
        res.status(200).send(`Upload created`);
        // const { fileName, description, imageName, mediaType, projectName } = req.body;
        // const { mediaFileToUpload, imageUpload } = req.files; // TODO still have to verify these types

        // const isValid = mediaFileToUpload !== undefined && imageUpload !== undefined
        //   && mediaFileToUpload !== 0 && imageUpload !== 0
        //   && mediaFileToUpload !== null && imageUpload !== null
        //   && mediaFileToUpload !== "" && imageUpload !== "";

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
    }
);

/**
* Respond with pre-defined password
* 
* Component making Axios call: AdminSendPW
*/
router.get("/send-pw", (req, res, next) => {
    let rounds = parseInt(process.env.SALT_ROUNDS);

    bcrypt.genSalt(rounds, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {

        });
    });

    res.status(200).send("Password generated");
});

router.delete('/:type/:id', (req, res, next) => {
    res.send('Got a DELETE request');
});

router.post("/error", (req, res, next) => {
    console.log(req.body);

    logger({
        location: "./files/logs/",
        desc: "error_boundary_trigger",
        headers: "N/A",
        message: `${req.body.error}\n Error Info: ${req.body.errorInfo}`
    });

    res.status(200).send({ message: "Message received" });
});

router.get("/logout", (req, res, next) => {
    req.logout();
    res.redirect("/");
});

// Fallback route. Respond with default index.html page
router.get("/*", function (req, res, next) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

module.exports = router;
