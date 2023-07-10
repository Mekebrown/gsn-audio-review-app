import axios from 'axios';
import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import SequelizeAdapter from "@auth/sequelize-adapter";
import { DataTypes } from "sequelize";

import sequelize from '../../../lib/db-related/seq_connect';

/**
 * ONLY requests to /api/auth/* will be processed 
 * by NextAuth I would like to use, in the session 
 * option, a strategy of database.
 * 
 * Credentials: Email/Password ONLY!
 * 
 * Resources:
 * - [Credentials Provider](https://next-auth.js.org/providers/credentials)
 * - [User database model](https://authjs.dev/reference/adapters#user)
*/

const providers = [
    CredentialsProvider({
        id: 'credentials',
        name: 'Credentials',
        session: {
            strategy: 'jwt' // TODO: https://authjs.dev/concepts/faq#json-web-tokens
        },
        authorize: async (credentials) => {
            if (!credentials) return null;

            try {
                const { data } = await axios.post(
                    '/auth/signin', 
                    {
                        password: credentials.password,
                        email: credentials.email
                    }
                );

                if (data?.token) {
                    return user;
                }

                return null;
            } catch (e) {
                console.error(e);
                throw new Error("Sign in error. Please try again!");
            }
        }
    })
];

/**
 * The jwt returned object has name, email, image (not needed), and token properties.
 * The session object returned has user and expires properties.
 */
const callbacks = {
    redirect: ({ url, baseUrl }) => {
        const str_to_search = url.toLowerCase();

        if (str_to_search.includes("/auth/signin")) {
            return `${baseUrl}/media`;
        } else if (str_to_search.startsWith("/")) {
            return `${baseUrl}${url}`;
        } else {
            return `${baseUrl}/auth/signin`;
        }
    },
    jwt: async ({ token, user, account, profile, isNewUser }) => { 
        const token_w_info = {};
        const current_token = token ? token : process.env.NEXTAUTH_SECRET;

        token_w_info.token = current_token
        token_w_info.accessToken = current_token;

        if (user) {
            token_w_info.id = user.id;
            token_w_info.name = user.name;
            token_w_info.email = user.email;
        }

        return Promise.resolve(token_w_info);
    },
    session: async ({ session, token, user }) => {
        if (session && token) {
            session.accessToken = token.accessToken
            session.user.id = token.id
        }

        return Promise.resolve(session);
    },
};

/**
 * The logger method expects an object with a 
 * description and a message. The code parameter is
 * provided by NextAuth.
 */
const logger = {
    debug: (code, metadata) => {
        console.log({code});
        console.log({metadata});
    },
    warn: (code) => {
        console.warn({code});
    },
    error: (code, metadata) => {
        console.error({code});
        console.error({metadata});
    },
};

const options = {
    providers,
    secret: process.env.NEXTAUTH_SECRET,
    adapter: SequelizeAdapter(sequelize, {
        models: {
            Media: {
                projectId: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
            },
            Note: {
                userId: {
                    type: DataTypes.UUID,
                    allowNull: false
                },
            },
            Project: {
                projectName: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
            },
            Signin: {
                userId: {
                    type: DataTypes.UUID,
                    allowNull: false
                },
            },
            Timer: {
                projectId: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                }
            }
        },
    }),
    callbacks,
    logger
};

export default NextAuth(options);
