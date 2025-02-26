import db from "../config/database.js";

export const getMovies = async (req, res) => {
    try {
        const [movies] = await db.query("SELECT * FROM movies");
        res.json(movies);
    } catch (err) {
        res.status(500).json({ error: err.message, message:"moviesnya gak ketemu"});
    }
};

export const getMovieById = async (req, res) => {
    try {
        const [movie] = await db.query("SELECT * FROM movies WHERE id = ?", [req.params.id]);
        if (!movie.length) return res.status(404).json({ message: "Movie not found" });
        res.json(movie[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const addMovie = async (req, res) => {
    console.log("Data dari frontend:", req.body);
    const { title, description, duration, release_date, image_url, price } = req.body;
    try {
        const [result] = await db.query(
            "INSERT INTO movies (title, description, duration, release_date, image_url, price) VALUES (?, ?, ?, ?, ?, ?)",
            [title, description, duration, release_date, image_url, price]
        );
        res.status(201).json({ 
            id: result.insertId, 
            title, 
            description, 
            duration, 
            release_date, 
            image_url,
            price 
        });
    } catch (err) {
        console.error("Database Error:", err);
        res.status(500).json({ error: err.message });
    }
};

export const deleteMovie = async (req, res) => {
    try {
        const [result] = await db.query("DELETE FROM movies WHERE id = ?", [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Movie not found" });
        }
        res.json({ message: "Movie deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateMovie = async (req, res) => {
    const { title, description, duration, release_date, image_url, price } = req.body;
    try {
        const [result] = await db.query(
            "UPDATE movies SET title = ?, description = ?, duration = ?, release_date = ?, image_url = ?, price = ? WHERE id = ?",
            [title, description, duration, release_date, image_url, price, req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Movie not found" });
        }
        res.json({ message: "Movie updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
