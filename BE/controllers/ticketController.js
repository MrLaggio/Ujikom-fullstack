import db from "../config/database.js";

export const getTickets = async (req, res) => {
    try {
        const [tickets] = await db.query("SELECT * FROM tickets WHERE bookingId IN (SELECT id FROM bookings WHERE userId = ?)", [req.user.id]);
        res.json(tickets);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
