// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { compare } from "bcryptjs";

// import { pool } from "@/app/lib/db-related/db";
// import handleErrors from "@/app/lib/error_handler";

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           handleErrors(res, 400, "Missing credentials", "auth/%5B...nextauth%5D/route.js");

//           throw new Error("Missing credentials");
//         }

//         const client = await pool.connect();

//         try {
//           const result = await client.query("SELECT * FROM users WHERE email = $1", [credentials.email]);
//           const user = result.rows[0];

//           if (!user) {
//             handleErrors(res, 404, "No user found", "auth/%5B...nextauth%5D/route.js");

//             throw new Error("No user found");
//           }

//           const isValid = await compare(credentials.password, user.password);

//           if (!isValid) {
//             handleErrors(res, 401, "Invalid password", "auth/%5B...nextauth%5D/route.js");

//             throw new Error("Invalid password");
//           }
//           return { id: user.id, name: user.name, email: user.email };
//         } finally {
//           client.release();
//         }
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/login",
//     signOut: "/",
//   },
//   callbacks: {
//     async session({ session, token }) {
//       session.user.id = token.sub;
//       return session;
//     },
//     async jwt({ token, user }) {
//       if (user) {
//         token.sub = user.id;
//       }
//       return token;
//     },
//   },
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
