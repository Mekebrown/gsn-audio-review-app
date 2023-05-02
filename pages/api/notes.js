export default function handler(req, res) {
    if (req.method === "POST") { 
        const is_new_note = req.body.new_note;
    }

    res.status(200).json({ 
        route: "notes" 
    });
};
