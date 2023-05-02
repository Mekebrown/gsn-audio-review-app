const logger = require("../logger");

export default function handler(req, res) {
    if (req) {
        res.status(200).json({ name: 'John Doe' });
    } else {
        logger({
            desc: "error",
            req: err.stack,
            res: "n/a",
            headers: "n/a",
            message: JSON.stringify(err)
        });

        console.error(err.stack);
    }
};
