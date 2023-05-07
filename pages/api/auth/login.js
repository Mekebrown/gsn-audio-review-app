const bcrypt = require("bcrypt");

const client = require("../../lib/db/pg_pr_connect");
const logger = require("../../lib/logger");
const { login_query } = require("../../lib/db/pg_pr_query_strings");

export default function handler(req, res) {
  if (req.method === "POST") {
    client.query(login_query, [username], (q_err, q_res) => {
      if (q_err) {
          logger({
              desc: "login query",
              req: "Body: " + JSON.stringify(req.body) + "Error: " + q_err.stack,
              res: "N/A",
              headers: "N/A",
              message: JSON.stringify(q_err)
          });

          console.error(q_err.stack);

          return done(q_err);
      }

      if (q_res.rows.length === 0) {
          return done(null, false, { message: 'Incorrect login information.' });
      }

      const user = q_res.rows[0];
      const hashed_password = user.hashed_password;

      bcrypt.compare(password, hashed_password).then(function (result) {
          if (!result) {
            return done(
              null, false, { 
                message: 'Incorrect password.' 
              }
            );
          } else {
            return done(null, user);
          }
      });
    });

    res.status(200).json({ 
      route: "login", 
      method: "post", 
    });
  } else if (req.method === "GET") {
    res.status(200).json({ 
      route: "login", 
      method: "get", 
    });
  }
};
