import bcrypt from "bcrypt";
import { getCsrfToken } from "next-auth/react";
import { getToken } from "next-auth/jwt";

import db from "../../../models";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body;
      const secret = process.env.NEXTAUTH_SECRET;
      const csrfToken = await getCsrfToken({ req });
      const jwtToken = await getToken({ req, secret });
      const User = db.User;

      if (email && password && User !== undefined) {
        const response = await User.findOne({ where: { email: email } });

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

          const result = await bcrypt.compare(password, hashed_password);
          
          if (!result) {
            return res 
              .status(401)
              .json({ data: { error: 'An error has occured. Please try again.'} });
          } else {
            res.status(200).json({ 
              data: { 
                user: {
                  id: user.id,
                  name: email,
                  email: email,
                  token: jwtToken, 
                  role: user.userRole,
                  mediaList: user.userMediaList,
                  notesIds: user.notesIds,
                  projectsIds: user.projectsIds
                },
                token: jwtToken
              },
            });
          }
        }
      } else { // email and/or password is missing
        return res.status(401).json({
          data: {
            error: "Sign in error; One or more fields are missing."
          },
        });
      }
    } catch (err) {
      console.error(err);
      
      return res.status(403).json({
        data: {
          error: "Sign-in error. Please try again.",
        },
      });
    }
  } else { // req.method === 'GET'
    res.status(405).json({
      data: {
        error: 'Sign in error. Only POST requests are allowed.'
      }
    });
  };
};
