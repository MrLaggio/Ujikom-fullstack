import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Booking = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [showtimes, setShowtimes] = useState([]);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [seat, setSeat] = useState('');
  const [ticketCount, setTicketCount] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/movies/${movieId}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    };

    const fetchShowtimes = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/showtimes?movieId=${movieId}`);
        setShowtimes(response.data);
      } catch (error) {
        console.error('Error fetching showtimes:', error);
      }
    };

    fetchMovie();
    fetchShowtimes();
  }, [movieId]);

  const handleBooking = async () => {
    if (!seat || !selectedShowtime) {
      alert('Please select a showtime and enter a seat number');
      return;
    }
    
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    try {
      await axios.post('http://localhost:5000/api/bookings', 
        { userId, showtimeId: selectedShowtime, seat },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert('Booking successful!');
      navigate('/FE_YAKA');
    } catch (error) {
      console.error('Error booking ticket:', error);
      alert('Booking failed!');
    }
  };

  const handleBack = () => {
    navigate('/FE_YAKA/choosefilm');
  };

  if (!movie) return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img 
              src={movie.image_url}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8 md:w-1/2">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">{movie.title}</h1>
              <button
                onClick={handleBack}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-300"
              >
                Back
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-600 mb-2">{movie.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>{movie.duration} minutes</span>
                <span>•</span>
                <span>{new Date(movie.release_date).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Select Showtime</h2>
              <select
                onChange={(e) => setSelectedShowtime(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a showtime</option>
                {showtimes.map(showtime => (
                  <option key={showtime.id} value={showtime.id}>
                    {new Date(showtime.showtime).toLocaleString()} - Rp {showtime.price}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Number of Tickets</h2>
              <div className="flex items-center gap-4 mb-6">
                <button
                  onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  -
                </button>
                <span className="text-xl font-semibold">{ticketCount}</span>
                <button
                  onClick={() => setTicketCount(ticketCount + 1)}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  +
                </button>
              </div>

              <h2 className="text-xl font-semibold text-gray-800 mb-3">Select Your Seat</h2>
              <input
                type="text"
                placeholder="Enter seat number (e.g. A1, B2)"
                value={seat}
                onChange={(e) => setSeat(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-blue-600">
                Rp {(movie.price * ticketCount)?.toLocaleString('id-ID')}
              </div>
              <button
                onClick={handleBooking}
                className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-300 font-medium shadow-lg hover:shadow-xl"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;