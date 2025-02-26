import express from "express";
import { register, login } from "../controllers/userController.js";
import { getMovies, getMovieById, addMovie, deleteMovie, updateMovie } from "../controllers/movieController.js";
import { getShowtimes } from "../controllers/showtimeController.js";
import { createBooking, getBookings } from "../controllers/bookingController.js";
import { getTickets } from "../controllers/ticketController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// auth routes
router.post("/register", register);
router.post("/login", login);

// movies
router.get("/movies", getMovies);
router.get("/movies/:id", getMovieById);
router.post("/movies", addMovie);
router.delete("/movies/:id", deleteMovie);
router.put("/movies/:id", updateMovie);

// showtimes
router.get("/showtimes", getShowtimes);

// bookings
router.post("/bookings", authenticateToken, createBooking);
router.get("/bookings", authenticateToken, getBookings);

// tickets
router.get("/tickets/:id",getTickets);



export default router;
