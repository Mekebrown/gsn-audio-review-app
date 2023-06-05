import bcrypt from "bcrypt";

import client from "../../lib/db/pg_pr_connect";
import logger from "../../lib/logger";
import { query_strings } from "../../lib/db/pg_pr_strings";

export default async function handler(req, res) {
  const { email, password } = req.body;

  console.log("email: " + email);
  console.log("password: " + password);
  
  client.query(query_strings.sign_in_query, [email])
  .then((response) => {
    if (response.error) {
        logger({
            desc: "sign in query",
            req: "Body: " + JSON.stringify(req.body) + "Error: " + response.stack,
            res: "N/A",
            headers: "N/A",
            message: JSON.stringify(response)
        });

        console.error(response.stack);

        res.status(500).json({ 
          data: { 
            error: "sign in query error", 
            route: "signin" 
          }
        });
    } else if (response.rows.length === 0) {
      console.log('Incorrect sign in information.');

      res.status(200).json({
        data: { 
          error: 'Incorrect sign in information.', 
          route: "signin" 
        }
      });
    } else {
      const user = response.rows[0];
      const hashed_password = user.hashed_password;

      bcrypt.compare(password, hashed_password).then(result => {
          if (!result) {
            return done(
              null, 
              false, 
              { message: 'Incorrect password.' }
            );
          } else {
            return done(null, user);
          }
      });
    }
  })
  .then(user => {
    logger({
        desc: "sign in query",
        req: "Body: " + JSON.stringify(req.body),
        res: "N/A",
        headers: "N/A",
        message: JSON.stringify(user_or_null)
    });

    res.status(200).json({ 
      data: { 
        email: req.body.email, 
        route: "signin",
        token: "token"
      }
    });
  })
  .catch((err) => {
    logger({
        desc: "sign in query",
        req: "Body: " + JSON.stringify(req.body) + "Error: " + err.stack,
        res: "N/A",
        headers: "N/A",
    });

    console.error(err.stack);

    res.status(200).json({ 
      data: { 
        error: "sign in error", 
        route: "signin" 
      }
    });
  });
};
