import axios from 'axios';
import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";

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
    CredentialsProvider.default({
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
        authorize: async (credentials, req) => {
            console.log('Starting the signup/login process ---');
            if (!credentials) return null;

            try {
            //     const user = await axios.post(process.env.NEXTAUTH_API_URL + '/auth/signin', {
            //         password: credentials.password,
            //         email: credentials.email
            //     });

            //     if (user.data.token) {
            //         return user;
            //     }

            //     return null;
                console.log('Ending the signup/login process ---');

                const user = {
                    data: {
                        email: credentials.email,
                        token: '1234567890',
                        route: '/signin'
                    }
                };

                return user;
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
    jwt: async ({ token, user }) => { // Needs to return a token
        console.log('fire jwt Callback');

        if (user) {
            // This will only be executed after a successful signin. Each next invocation will skip this part.
            token.user.email = user.data.email;
            token.user.token = user.data.token;
        }

        const session_time = 60 * 60 * 24 * 30; // 30 days

        return Promise.resolve(token);
    },
    session: async ({ session, token, user }) => { // Needs to return a session
        console.log('fire SESSION Callback');

        if (user && token) {
            session.user.email = user.data.email;

            return Promise.resolve(session);
        }
    },
}

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
}

export const auto_options = {
    providers,
    callbacks,
    pages,
    logger,
    secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth.default(auto_options);
