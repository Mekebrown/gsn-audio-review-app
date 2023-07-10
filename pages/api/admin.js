import { getServerSession } from "next-auth/next";

import { authOptions } from "/auth/[...nextauth]";

export default async function handler(req, res) {
    const session = await getServerSession(req, authOptions);

    if (session) {
        res.status(200).json({ route: "admin" });
    } else {
        res.status(200).json({ content: "You must be signed in as an admin." });
    }
};
