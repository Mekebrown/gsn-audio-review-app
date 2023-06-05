const note_info = {
    id: 1,
    mediaId: 1,
    userId: 1,
    content: "(string)",
    created: "01-01-2021 00:00:00",
    updated: "01-01-2021 00:00:00",
    deleted: null,
};

/**
 * @param {Object} req 
 * @param {Object} res 
 */
export default function handler( req, res ) {
    if (req.method === "GET") {
        res.status(200).json({ 
            route: "notes/id", 
            method: "GET",
            note: note_info 
        });
    } else if (req.method === "DELETE") {
        res.status(200).json({
            route: "notes/id",
            method: "DELETE",
            is_note_deleted: true 
        });
    }
};
