const { Client } = require('pg');
const { logger } = require("../tools/logger");

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

module.exports = client;
