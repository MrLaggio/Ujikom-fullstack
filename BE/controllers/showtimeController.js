import db from "../config/database.js";

export const getShowtimes = async (req, res) => {
    try {
        const [showtimes] = await db.query(`
            SELECT showtimes.*, movies.title, theaters.name as theater 
            FROM showtimes 
            JOIN movies ON showtimes.movieId = movies.id 
            JOIN theaters ON showtimes.theaterId = theaters.id
        `);
        res.json(showtimes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
