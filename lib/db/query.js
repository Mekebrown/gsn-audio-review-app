const bcrypt = require('bcrypt');

const queries = require("./pg_query_strings");
const logger = require("../logger");

const initOptions = {
    capSQL: true,
};
const values = {
    user: process.env.PG_USER,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT,
    host: process.env.PG_HOST,
    password: process.env.PG_PASSWORD,
    ssl: true
};

const conn = require('pg-promise')(initOptions);

conn.any(queries.select_all, [true])
    .then(data => {
        console.log("Connection has been established successfully");
    })
    .catch(error => {
        logger({
            desc: "pg_connect",
            req: "conn variable: " + JSON.stringify(conn) +
                " -|- process.env.PGUSER: " + process.env.PGUSER +
                " -|- process.env.PGHOST: " + process.env.PGHOST +
                " -|- process.env.PGPASSWORD: " + process.env.PGPASSWORD +
                " -|- process.env.PGDATABASE: " + process.env.PGDATABASE +
                " -|- process.env.PGPORT: " + process.env.PGPORT,
            message: err
        });

        console.error("Unable to connect to the database:", error);
    });
