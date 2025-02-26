import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../component/Footer';

const ChoseFilm = () => {
  const [movies, setMovies] = useState([]);
  const [showtimes, setShowtimes] = useState([]);
  const navigate = useNavigate();
  const API_URL = 'http://localhost:5000/api/movies';

  useEffect(() => {
    fetchMovies();
    fetchShowtimes();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(API_URL);
      setMovies(response.data);
    } catch (error) {
      console.error('Ada kesalahan saat mengambil data film:', error.message);
    }
  };

  const fetchShowtimes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/showtimes');
      setShowtimes(response.data);
    } catch (error) {
      console.error('Error fetching showtimes:', error);
    }
  };

  const handleSelectMovie = (movieId) => {
    // Navigate to booking page with selected movie
    navigate(`/FE_YAKA/booking/${movieId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-12 text-center text-white tracking-wide">Pilih Film</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {movies.map((movie) => (
            <div key={movie.id} className="bg-gray-50 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 flex flex-col h-full">
              <div className="relative">
                <img 
                  src={movie.image_url} 
                  alt={movie.title}
                  className="w-full h-80 object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {movie.duration} min
                </div>
              </div>
              <div className="p-8 flex-grow">
                <h2 className="text-2xl font-bold mb-3 text-gray-800 hover:text-blue-600 transition-colors">{movie.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">{movie.description}</p>
              </div>
              <div className="p-8 pt-0 mt-auto border-t border-gray-100">
                <span className="block text-gray-500 text-sm font-medium mb-4">
                  {new Date(movie.release_date).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-blue-600">
                    Rp {movie.price.toLocaleString('id-ID')}
                  </span>
                  <button
                    onClick={() => handleSelectMovie(movie.id)}
                    className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-red-600 transition-colors duration-300 font-medium shadow-md hover:shadow-lg"
                  >
                    Pilih Film
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChoseFilm;
