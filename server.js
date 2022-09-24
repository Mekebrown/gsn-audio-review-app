const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const bp = require("body-parser");
const fileupload = require("express-fileupload");
const passport = require('passport');
const session = require("express-session");

const logger = require("./server/tools/logger");
const router = require("./server/routes/index.js");

require("dotenv").config();
require("./server/tools/client_passport");

app.use(express.json());
app.use(fileupload());
app.use(express.urlencoded({ extended: true }));
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "client", "public")));
app.use(express.static(path.join(__dirname, "files", "logs")));
app.use(cors(require("./server/tools/cors_options")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
}

app.use(session({
  store: new (require("connect-pg-simple")(session))({
    createTableIfMissing: true,
    pgPromise: require('pg-promise')({ promiseLib: require('bluebird') })({
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      host: process.env.PGHOST,
      port: process.env.PGPORT,
      database: process.env.PGDATABASE
    })
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // One day
  }
}));
app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
}

app.use("/api", router);

// Uncaught error handling catch
app.use((err, req, res, next) => {
  console.error(err.stack);

  logger({
    desc: "error",
    req: err.stack,
    res: "n/a",
    headers: "n/a",
    message: JSON.stringify(err)
  });

  res.status(500).redirect('/');;
});

app.listen(process.env.PORT || 3001, function () {
  console.log(process.env.SERVER_PORT);
});
