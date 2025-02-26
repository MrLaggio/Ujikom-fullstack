import User from '../models/userModel.js';
import Booking from '../models/bookingModel.js';
import Flight from '../models/flightModel.js';
import Ticket from '../models/ticketModel.js';
import Airline from '../models/airlineModel.js';
import db from '../config/database.js';
import "../models/index.js"
const seedDatabase = async () => {
    // await db.sync({ force: true });

    // Seeder untuk User
    const user = await User.create(
        { name: 'John Doe', email: 'john@example.com', password: 'password123', isAdmin: false }
    );

    // Seeder untuk Airline
    const airline = await Airline.create(
        { name: 'Garuda Indonesia', country: "indonesia" }
    );

    // Seeder untuk Flight
    const flight = await Flight.create(
        { from: 'Jakarta', to: 'Bali', departure: new Date(), arrival: new Date(), price: 1000000, airlineId: airline.id }
    );

    // Seeder untuk Booking
    const booking = await Booking.create(
        { name: 'John Doe', email: 'john@example.com', seat: 'A1', userId: user.id }
    );

    // Seeder untuk Ticket
    const ticket = await Ticket.create(
        { booking_uid: bookingUID,
            flightId:flight.id,
            bookingId2:booking.id
        }
    );

    console.log('Database seeded successfully');
};

const generateUID = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let uid = "";
    for (let i = 0; i < 10; i++) {
      uid += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return uid;
}
const bookingUID = generateUID()
const user = await seedDatabase()
console.log(user)
