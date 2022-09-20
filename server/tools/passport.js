const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { login_query } = require("../database/query_strings");
const { logger } = require("../tools/logger");
const { client } = require("../database/db_details");

require("dotenv").config();

passport.use(new LocalStrategy(
    function (username, password, done) {
        client.query(login_query, [username], (err, res) => {
            if (err) {
                logger({
                    desc: "passport_local_strategy",
                    req: "Body: " + JSON.stringify(req.body),
                    res: "N/A",
                    headers: "N/A",
                    message: JSON.stringify(err)
                });

                return done(err);
            }

            if (res.rows.length === 0) {
                return done(null, false, { message: 'Incorrect username.' });
            }

            const user = res.rows[0];
            const hashed_password = user.hashed_password;

            bcrypt.compare(password, hashed_password).then(function (result) {
                if (!result) return done(null, false, { message: 'Incorrect password.' });

                return done(null, user);
            });
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    client.query('SELECT * FROM users WHERE id = $1', [id], (err, res) => {
        if (err) {
            logger({
                desc: "passport_deserializeUser",
                req: "ID: " + id,
                res: "N/A",
                headers: "N/A",
                message: JSON.stringify(err)
            });

            return done(err);
        }

        return done(null, res.rows[0]);
    });
});

module.exports = passport;
