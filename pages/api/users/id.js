const user_info = {
    id: 1,
    note_ids: [1, 2, 3],
    tag: "(string) - uuid",
    email: "admin@gsn.net",
    lastSignin: "01-04-2021 00:00:00",
    role: "admin",
    image: "https://i.pravatar.cc/300",
    media: [1],
    notifs: {
        users: 2,
        notes: 2,
        media: 1,
    },
    settings: {
        light_mode: true
    },
};

/**
 * @param {Object} req 
 * @param {Object} res 
 */
export default function handler( req, res ) {
    if (req.method === "GET") {
        res.status(200).json({ 
            route: "users/id", 
            method: "GET",
            user: user_info 
        });
    } else if (req.method === "DELETE") {
        res.status(200).json({ 
            route: "users/id", 
            method: "DELETE",
            is_user_deleted: true 
        });
    }
};
