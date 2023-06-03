const bcrypt = require("bcrypt");

const client = require("../../lib/db/pg_pr_connect");
const logger = require("../../lib/logger");
const { login_query } = require("../../lib/db/pg_pr_query_strings");

export default function handler(req, res) {
    const { email, password } = req.body;

    if (req) {
        client.query(login_query, [email], (err, res) => {
            if (err) {
                logger({
                    desc: "login query",
                    req: "Body: " + JSON.stringify(req.body),
                    res: "N/A",
                    headers: "N/A",
                    message: JSON.stringify(err)
                });

                return done(err);
            }

            if (res.rows.length === 0) {
                return done(null, false, { message: 'Incorrect login information.' });
            }

            const user = res.rows[0];
            const hashed_password = user.hashed_password;

            bcrypt.compare(password, hashed_password).then(function (result) {
                if (!result) return done(null, false, { message: 'Incorrect password.' });

                return done(null, user);
            });
        });

        res.status(200).json({ name: 'John Doe' });
    } else {
        logger({
            desc: "error",
            req: err.stack,
            res: "n/a",
            headers: "n/a",
            message: JSON.stringify(err)
        });

        console.error(err.stack);
    }
};
