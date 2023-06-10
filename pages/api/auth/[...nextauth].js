import axios from 'axios';
import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import SequelizeAdapter from "@next-auth/sequelize-adapter";

import sequelize from "../../../lib/db-related/seq_connect";

/**
 * ONLY requests to /api/auth/* will be processed 
 * by NextAuth I would like to use, in the session 
 * option, a strategy of database.
 * 
 * Credentials: Email/Password ONLY!
 */

/*
* Resources:
* - [Credentials Provider](https://next-auth.js.org/providers/credentials)
* - [User database model](https://authjs.dev/reference/adapters#user)
*/

const providers = [
    CredentialsProvider({
        id: 'credentials',
        type: 'credentials',
        name: 'Credentials',
        session: {
            strategy: 'jwt'
        },
        credentials: {
            email: { label: "email", type: "email", placeholder: "jsmith" },
            password: { label: "password", type: "password", placeholder: "********" }
        },
        authorize: async (credentials) => {
            if (!credentials) return null;

            try {
                const user = await axios.post(
                    process.env.NEXTAUTH_API_URL + '/auth/signin', 
                    {
                        password: credentials.password,
                        email: credentials.email
                    }
                );

                if (user.data.token) {
                    return user;
                }

                return null;
            } catch (e) {
                throw new Error(e);
            }
        }
    })
];

/**
 * The session object returned has user and expires properties.
 * The jwt returned object has name, email, image, and token properties.
 */
const callbacks = {
    async redirect({ url, baseUrl }) {
        const str_to_search = url.toLowerCase();

        if (str_to_search.includes("/auth/signin")) {
            return `${baseUrl}/media`;
        } else if (str_to_search.startsWith("/")) {
            return `${baseUrl}${url}`;
        } else {
            return `${baseUrl}/auth/signin`;
        }
    },
    jwt: async ({ token, user }) => { 
        if (user) {
            // This will only be executed after a successful signin. Each next invocation will skip this part.
            token.name = user.data.email;
            token.email = user.data.email;
            token.image = "https://media.istockphoto.com/id/492418894/vector/fun-sign.jpg?s=612x612&w=0&k=20&c=hPUa8EdrNAyf2UuPWAIMFZYFsIGKxTX0kyPhPwZBu48=";
            token.image = user.data.image;
            token.token = user.data.token;
        }

        const session_time = 60 * 60 * 24 * 30; // 30 days

        return Promise.resolve(token);
    },
    session: async ({ session, token }) => {
        if (token) {
            return Promise.resolve(session);
        }
    },
};

const pages = {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
};

/**
 * The logger method expects an object with a 
 * description and a message. The code parameter is
 * provided by NextAuth.
 */
const logger = {
    debug: (code, metadata) => {
        console.log(code, metadata);
    },
    warn: (code, metadata) => {
        console.warn(code, metadata);
    },
    error: (code, metadata) => {
        console.error(code, metadata);
    },
};

export const auto_options = {
    secret: process.env.NEXTAUTH_SECRET,
    providers,
    adapter: SequelizeAdapter(sequelize),
    callbacks,
    pages,
    logger
};

export default NextAuth(auto_options);
