const initOptions = {
    capSQL: true,
};
const values = {
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
    host: process.env.PGHOST,
    password: process.env.PGPASSWORD,
    ssl: true
};

const client = require('pg-promise')(initOptions);

client.connect(values)
    .then(data => {
        console.log("Connection has been established successfully");
    })
    .catch(error => {
        const logger = require("../logger");

        logger({
            desc: "pg promise connection",
            req: "conn variables: " + JSON.stringify(values),
            message: err
        });

        console.error("Unable to connect to the database:", error);
    });

module.exports = client;
