const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { login_query } = require("../database/query_strings");
const logger = require("./logger");
const { Client } = require('pg');

require("dotenv").config();
let options = null;

if (process.env.NODE_ENV === "production") {
    options = {
        connectionString: process.env.DATABASE_URL || process.env.PG_URI_APP,
        ssl: {
            rejectUnauthorized: false
        }
    };
}

const client = new Client(options);

client.connect()
    .then(() => console.log("Connection has been established successfully"))
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
    }
    );

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

module.exports = {
    client,
    passport
};
