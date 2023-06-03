import axios from 'axios';
import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";

import logger from "../../../lib/logger";

/**
 * ONLY requests to /api/auth/* will be processed 
 * by NextAuth I would like to use, in the session 
 * option, a strategy of database.
 * 
 * Credentials: Email/Password ONLY!
 */

const providers = [
    CredentialsProvider({
        id: 'credentials',
        type: 'credentials',
        name: 'Credentials',
        credentials: {
            email: { label: "email", type: "email", placeholder: "lj@lj.co" },
            password: { label: "Password", type: "password" },
        },
        authorize: async (credentials, req) => {
            try {
                const user = await axios.post(process.env.NEXTAUTH_API_URL + 'auth/login', {
                    password: credentials.password,
                    email: credentials.email
                });

                const details = {
                    desc: "authorize-credentialsProvider",
                    message: "authorization attempt",
                    req: { headers: req.headers },
                };

                logger(details);

                if (user.data.token) {
                    return user;
                }

                return null;
            } catch (e) {
                throw new Error(e);
            }
        }
    })
]

/**
 * If CredentialsProvider is used, the jwt and session are both required.
 */
const callbacks = {
    jwt: async ({ token, user }) => {
        if (user) {
            // This will only be executed after a successful login. Each next invocation will skip this part.
            token.user.email = user.data.email;
        }

        const session_time = 60 * 60 * 24 * 30; // 30 days

        return Promise.resolve(token);
    },
    session: async ({ session, token, user }) => {
        if (user && token) {
            session.user.email = user.data.email;

            return Promise.resolve(session);
        }
    },
}

const pages = {
    signIn: '/auth/login',
    signOut: '/auth/logout',
};

/**
 * The logger method expects an object with a 
 * description and a message. The code parameter is
 * provided by NextAuth.
 */
const logger = {
    debug: (code, metadata) => {
        const details = {
            desc: "debug",
            message: "tbd",
            req: { metadata: metadata, code: code },
        };

        logger(details);

        console.log(code, metadata);
    },
    warn: (code, metadata) => {
        const details = {
            desc: "warn",
            message: "tbd",
            req: { metadata: metadata, code: code },
        };

        logger(details);

        console.warn(code, metadata);
    },
    error: (code, metadata) => {
        const details = {
            desc: "error",
            message: "tbd",
            req: { metadata: metadata, code: code },
        };

        logger(details);

        console.error(code, metadata);
    },
}

export const auto_options = {
    providers,
    callbacks,
    pages,
    secret: process.env.NEXTAUTH_SECRET,
}

export default function Auth(req, res) {
    NextAuth(req, res, auto_options);
}
