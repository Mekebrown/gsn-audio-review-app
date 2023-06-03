const bcrypt = require("bcrypt");
import { getToken } from "next-auth/jwt";

const client = require("../../lib/db/pg_pr_connect");
const logger = require("../../lib/logger");
const { login_query } = require("../../lib/db/pg_pr_query_strings");

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(req, res) {
  const { email, password } = req.body;
  
  client.query(login_query, [email])
    .then((q_err, q_res) => {
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
  })
  .then(async (user) => {
    const token = await getToken({ req, secret });

    logger({
        desc: "login query",
        req: "Body: " + JSON.stringify(req.body),
        res: "N/A",
        headers: "N/A",
        message: JSON.stringify(user)
    });

    res.status(200).json({ 
      data: { 
        email: req.body.email, 
        route: "login",
        token: token
      }
    });
  })
  .catch((err) => {
    logger({
        desc: "login query",
        req: "Body: " + JSON.stringify(req.body) + "Error: " + err.stack,
        res: "N/A",
        headers: "N/A",
    });

    res.status(200).json({ 
      data: { 
        error: "login error", 
        route: "login" 
      }
    });
  });
};
