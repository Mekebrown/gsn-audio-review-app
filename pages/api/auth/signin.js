import bcrypt from "bcrypt";
import { getCsrfToken } from "next-auth/react";

import sequelize from "../../../lib/db-related/seq_connect";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    const User = sequelize.models.User;

    const csrfToken = await getCsrfToken({ req });

    if (email && password && User) {
      User.findOne({ where: { email: email } })
      .then((response) => {
        if (response.error) {
            res.status(500).json({ 
              data: { 
                error: "sign in query error"
              }
            });
        } else if (response.rows.length === 0) {
          res.status(403).json({
            data: { 
              error: 'Incorrect sign in information.'
            }
          });
        } else {
          const user = response.rows[0];
          const hashed_password = user.userHashedPW;

          bcrypt.compare(password, hashed_password)
          .then(result => {
            if (!result) {
              return done( null, false, { 
                message: 'Incorrect password.' 
              });
            } else {
              return done(null, user);
            }
          });
        }
      })
      .then(user => {
        if (!user) {
          res.status(403).json({ 
            data: { 
              error: "sign in error"
            }
          });
        }

        res.status(200).json({ 
          data: { 
            user: {
              name: email,
              email: email, 
              role: user.userRole,
              id: user.id,
              mediaList: user.userMediaList,
              notesIds: user.notesIds,
              projectsIds: user.projectsIds
            },
            token: csrfToken,
          }
        });
      })
      .catch((err) => {
        res.status(403).json({ 
          data: { 
            error: "sign in error"
          }
        });
      });
    } else { // email and/or password is missing
      res.status(401).json({
        data: {
          error: "sign in error"
        }
      });
    }
  } else { // req.method === 'GET'
    res.status(405).json({
      data: {
        error: 'sign in error'
      }
    });
  }
};
