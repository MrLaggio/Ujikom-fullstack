import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Footer from '../component/Footer';

const API_URL = "http://localhost:5000/api/movies";

const Home = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => setMovies(response.data))
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  const handleOpen = (movie) => {
    setSelectedMovie(movie);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMovie(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero Section */}
      <div className="relative h-screen bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3')"}}> 
        <div className="absolute inset-0 bg-black bg-opacity-60">
          <div className="container mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
            <h1 className="text-7xl font-bold text-white mb-8">TuxId Cinema</h1>
            <p className="text-2xl text-gray-200 mb-10 max-w-3xl">
              Nikmati pengalaman menonton terbaik dengan koleksi film terbaru kami. 
              Tersedia dalam kualitas gambar dan suara yang memukau.
            </p>
            <Button
              variant="contained"
              className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 text-xl"
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate("/FE_YAKA/choosefilm")}
            >
              Pesan Tiket Sekarang
            </Button>
          </div>
        </div>
      </div>

      {/* Now Showing Section */}
      <div className="container mx-auto px-6 py-20">
        <h2 className="text-5xl font-bold text-white text-center mb-16">
          Sedang Tayang
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {movies.map((movie) => (
            <Card
              key={movie.id}
              className="bg-gray-900 rounded-xl overflow-hidden transform hover:scale-105 transition duration-300"
            >
              <div className="relative h-[600px]">
                <img 
                  src={movie.image_url} 
                  alt={movie.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-90" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">{movie.title}</h3>
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="contained"
                      className="bg-red-600 hover:bg-red-700 w-full py-3 text-lg"
                      onClick={() => handleOpen(movie)}
                    >
                      Lihat Detail
                    </Button>
                    <Button
                      variant="contained"
                      className="bg-blue-600 hover:bg-blue-700 w-full py-3 text-lg"
                      onClick={() => navigate(`/FE_YAKA/booking/${movie.id}`)}
                    >
                      Pesan Tiket
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Modal */}
      <Modal 
        open={open} 
        onClose={handleClose}
        className="flex items-center justify-center"
      >
        <Box className="bg-gray-900 text-white rounded-xl p-8 max-w-4xl mx-4">
          {selectedMovie && (
            <div className="flex flex-col md:flex-row gap-8">
              <img 
                src={selectedMovie.image_url} 
                alt={selectedMovie.title} 
                className="w-full md:w-2/3 rounded-lg object-cover h-[600px]"
              />
              <div className="flex-1">
                <Typography variant="h4" className="text-3xl font-bold mb-6">
                  {selectedMovie.title}
                </Typography>
                <Typography className="text-gray-300 mb-6 text-lg">
                  {selectedMovie.description}
                </Typography>
                <div className="space-y-4 text-gray-300 text-lg">
                  <p>Durasi: {selectedMovie.duration} menit</p>
                  <p>Tanggal Rilis: {new Date(selectedMovie.release_date).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}</p>
                  <p className="text-2xl font-bold text-red-500">Harga: Rp {selectedMovie.price}</p>
                </div>
                <div className="mt-12 flex flex-col sm:flex-row gap-4">
                  <Button 
                    variant="contained" 
                    className="bg-red-600 hover:bg-red-700 py-3 px-8 text-lg font-semibold rounded-xl shadow-lg hover:shadow-red-600/30 transform hover:-translate-y-1 transition duration-300"
                    onClick={() => {
                      handleClose();
                      navigate(`/FE_YAKA/booking/${selectedMovie.id}`);
                    }}
                  >
                    Pesan Tiket
                  </Button>
                  <Button 
                    variant="outlined"
                    className="border-2 border-gray-500 text-gray-300 hover:text-white hover:border-gray-400 py-3 px-8 text-lg font-semibold rounded-xl transform hover:-translate-y-1 transition duration-300"
                    onClick={handleClose}
                  >
                    Tutup
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Box>
      </Modal>

      <Footer />
    </div>
  );
};

export default Home;
