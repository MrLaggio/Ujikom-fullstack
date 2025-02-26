import { v4 as uuidv4 } from "uuid";
import db from "../config/database.js";

export const createBooking = async (req, res) => {
    const { userId, showtimeId, seat } = req.body;
    
    const bookingUID = uuidv4();

    try {
        await db.query("INSERT INTO bookings (userId, showtimeId, seat, booking_uid) VALUES (?, ?, ?, ?)", [userId, showtimeId, seat, bookingUID]);
        res.json({ message: "Booking successful", bookingUID });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getBookings = async (req, res) => {
    try {
        const [bookings] = await db.query(`
            SELECT bookings.*, movies.title, theaters.name as theater 
            FROM bookings 
            JOIN showtimes ON bookings.showtimeId = showtimes.id 
            JOIN movies ON showtimes.movieId = movies.id 
            JOIN theaters ON showtimes.theaterId = theaters.id 
            WHERE bookings.userId = ?
        `, [req.user.id]);

        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
