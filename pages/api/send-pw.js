/**
 * Will never be a GET request
 * 
 * @param {Object} req
 * @param {Object} res 
 */
export default function handler(req, res) {
    res.status(200).json({ 
        route: "send-pw" 
    });
};
