const router = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const { body, validationResult } = require("express-validator");
const generator = require('generate-password');

const { client } = require("../tools/client_passport");
const {
    all_media_query_statement,
    contact_query_statement,
    media_upload_query_statement,
    media_query_statement,
    insert_note_query,
    update_note_query,
    notes_query_statement,
    update_user_login_query,
    set_pw_query,
    single_media_query_statement
} = require("../database/query_strings");
const { setMediaStorage } = require("../tools/server_helpers");
const logger = require("../tools/logger");

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
    body('username').trim().escape().not().isEmpty()
        .withMessage('Username cannot be empty')
        .isLength({ min: 5 })
        .withMessage('Username must be five or more characters long')
        .isLength({ max: 25 })
        .withMessage('Username must be up to 25 characters long'),
    body('password').trim().escape().not().isEmpty()
        .withMessage('Password cannot be empty')
        .matches(/[LTa-z-]/g)
        .withMessage('Password not correct'),
    passport.authenticate('local'), //          admin@email.enter        aLotmosdef-behemoth-souls
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            logger({
                desc: "validate_login",
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

        const header_info = req.rawHeaders.join(" -|- ");

        const current_date = new Date();

        const update_user_login_values = [header_info, current_date, req.body.username];

        req.session.role = req.user.role;

        getQueryValues(update_user_login_query, update_user_login_values)
            .then((data) => {
                req.session.role = data.rows[0].role;

                if (req.session.views) {
                    req.session.views++;
                } else {
                    req.session.views = 1;
                }

                res.status(200).send({ message: "Login info accepted", user_role: res.user.role, user_id: data.rows[0].id });
            })
            .catch((err) => res.status(403).send("Information not accepted"));
    }
);

router.get("/is-authenticated", (req, res, next) => {
    if (req.isAuthenticated()) {
        res.status(200).send({ message: "User is authenticated", user_id: req.user.id, user_role: req.user.role });
    } else {
        res.send({ message: "User is not authenticated" });
    }
});

router.get("/logout", (req, res, next) => {
    try {
        req.session.destroy();
        req.logout();

        res.status(200);
    } catch (e) {
        console.error(e);

        res.status(500);
    }
});

/**
* Redirect
* 
* Internal redirect
*/
router.get("/admin", function (req, res, next) {
    res.status(200).send(`All info will be sent to the front end`);
});

/**
* Redirect
* 
* Internal redirect
*/
router.get("/review", function (req, res, next) {
    res.status(200).send(`All info will be sent to the front end`);
});

/**
* Respond with all media info
* 
* Component making Axios call: AdminShowAllProjects
* Component making Axios call: UserAllMediaToReview
*/
router.get("/media", function (req, res, next) {
    if (req.isAuthenticated()) {
        let media_list = req.user.media_list;
        let get_media_projects;
        let data_to_send = [];

        get_media_projects = media_list && media_list.length > 0 ? all_media_query_statement + ` WHERE id in (${media_list.join(", ")})` : all_media_query_statement;

        getQueryValues(get_media_projects)
            .then((data) => {
                data_to_send.push(data.rows);

                current_notes_query_statement = req.user.role === "admin" ? `SELECT id, media_id, note_body, note_timestamp
                    FROM notes ORDER BY created_at DESC` :
                    `SELECT id, media_id, note_body, note_timestamp FROM notes WHERE media_id in (${media_list.join(", ")}) AND user_id = $1 ORDER BY created_at DESC`;

                return getQueryValues(current_notes_query_statement, [req.user.id]);
            })
            .then((data) => {
                data_to_send.push(data.rows);

                for (let i = 0; i < data_to_send[0].length; i++) {
                    data_to_send[0][i].notes = [];
                    for (let j = 0; j < data_to_send[1].length; j++) {
                        if (data_to_send[0][i].id === data_to_send[1][j].media_id) {
                            data_to_send[0][i].notes.push(data_to_send[1][j]);
                        }
                    }
                }

                res.status(200).send({ message: "Media is retrieved", user_id: req.user.id, media_items: data_to_send[0] });
            })
            .catch((err) => {
                logger({
                    desc: "all_media_retrieval",
                    req: "N/A",
                    res: "N/A",
                    headers: JSON.stringify(req.rawHeaders),
                    message: JSON.stringify(err)
                });

                console.error(err);

                res.status(403).send("Media is not retrieved");
            });
    } else {
        res.send({ message: "User is not authenticated" });
    }
});

router.get("/notes", function (req, res, next) { res.status(200); });

router.get("/users", function (req, res, next) { res.status(200); });

/**
* Get a type and its id (media, note, user). Respond with that type's data.
* 
* Component making Axios call: UserSingleProject (type: Media)
* Component making Axios call: AdminSingleNote (type: Note)
* Component making Axios call: AdminSingleProject (type: Media)
* Component making Axios call: AdminShowSingleUser (type: User)
*/
router.get("/media/:id", (req, res, next) => {
    if (req.isAuthenticated() && parseInt(req.params.id)) {
        let data_to_send = {};

        getQueryValues(single_media_query_statement, [req.params.id])
            .then((data) => {
                data_to_send = data.rows[0];

                notes_query_statement = req.user.role === "admin" ? `SELECT id, note_body, note_timestamp
                FROM notes 
                WHERE media_id = $1 
                ORDER BY created_at 
                DESC` : notes_query_statement;

                return getQueryValues(notes_query_statement, [req.params.id, req.user.id]);
            })
            .then((data) => {
                data_to_send["notes"] = data.rows;

                res.status(200).send({ message: "Media info retrieved", media_info: data_to_send });
            })
            .catch((err) => res.status(403).send("Media info not retrieved"));
    } else {
        res.send({ message: "User is not authenticated" });
    }
});

/**
* Get a type and its id (media, note, user). Respond with that type's data.
* 
* Component making Axios call: UserSingleProject (type: Media)
* Component making Axios call: AdminSingleNote (type: Note)
* Component making Axios call: AdminSingleProject (type: Media)
* Component making Axios call: AdminShowSingleUser (type: User)
*/
router.get("/notes/:id", (req, res, next) => {
    res.status(200);
});

/**
* Get a type and its id (media, note, user). Respond with that type's data.
* 
* Component making Axios call: UserSingleProject (type: Media)
* Component making Axios call: AdminSingleNote (type: Note)
* Component making Axios call: AdminSingleProject (type: Media)
* Component making Axios call: AdminShowSingleUser (type: User)
*/
router.get("/users/:id", (req, res, next) => {
    res.status(200);
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
        //         headers: JSON.stringify(req.rawHeaders),
        //         message: JSON.stringify(err)
        //       });

        //       console.error(err);

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
        //         headers: JSON.stringify(req.rawHeaders),
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
        //         headers: JSON.stringify(req.rawHeaders),
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
    let new_password = generator.generate({
        length: 15,
        numbers: true,
        symbols: true
    });

    bcrypt.genSalt(rounds, function (err, salt) {
        bcrypt.hash(new_password, salt, function (err, hash) {

        });
    });

    // or

    // const hashedPassword = bcrypt.hashSync(new_password, 10);

    // const data = await client.query(
    //     set_pw_query,
    //     ["reviewer", req.body.email, hashedPassword, [x, y, z]]
    // );

    // if (data.rows.length === 0) {
    //     res.sendStatus(403).send("Password not generated");
    // }

    res.status(200).send({ message: "Password generated", });
});

router.delete('/users/:id', (req, res, next) => {
    res.send('Got a DELETE request');
});

/**
 * Form values: checkbox of reason for contact, message 
 * 
 * Component making Axios call: ContactForm - Modal from App.js icon
 */
router.post("/contact", (req, res, next) => {
    const { reason, message } = req.body;

    const current_datetime = new Date();

    const contact_values = { reason: reason, message: message, date_time: current_datetime };

    getQueryValues(contact_query_statement, [contact_values, req.user.id])
        .then((data) => {
            logger({
                location: "./files/logs/",
                desc: "contact",
                headers: req.rawHeaders.join(" -|- "),
                message: JSON.stringify(contact_values) + " -|- " + JSON.stringify(data)
            });

            res.status(200).send({ message: "Contact form submitted" });
        })
        .catch((err) => {
            logger({
                location: "./files/logs/",
                desc: "contact_error",
                headers: req.rawHeaders.join(" -|- "),
                message: JSON.stringify(contact_values) + " -|- " + JSON.stringify(err)
            });

            res.status(403).send({ message: "Contact form not submitted" });
        });
});

router.post("/error", (req, res, next) => {
    console.error(req.body);

    logger({
        location: "./files/logs/",
        desc: "error_boundary_trigger",
        headers: "N/A",
        message: `${req.body.error}\n Error Info: ${req.body.errorInfo}`
    });

    res.status(200).send({ message: "Message received" });
});

// Fallback route. Respond with default index.html page
router.get("/*", function (req, res, next) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

module.exports = router;
