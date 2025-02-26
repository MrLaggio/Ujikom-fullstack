import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({ title: '', description: '', duration: '', release_date: '', image_url: '', price: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const API_URL = 'http://localhost:5000/api/movies';

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(API_URL);
      setMovies(response.data);
    } catch (error) {
      console.error('Ada kesalahan saat mengambil data film:', error.message);
    }
  };

  const handleAddMovie = async () => {
    if (Object.values(newMovie).some(value => !value)) {
      alert('Form tidak boleh kosong');
      return;
    }

    const formattedMovie = {
      ...newMovie,
      release_date: new Date(newMovie.release_date).toISOString().split('T')[0]
    };

    try {
      await axios.post(API_URL, formattedMovie);
      resetForm();
      fetchMovies();
    } catch (error) {
      console.error('Ada kesalahan saat menambahkan film:', error.message);
    }
  };

  const handleEditMovie = (movie) => {
    setEditingMovie(movie);
    setNewMovie({
      title: movie.title,
      description: movie.description,
      duration: movie.duration,
      release_date: new Date(movie.release_date).toISOString().split('T')[0],
      image_url: movie.image_url,
      price: movie.price
    });
    setIsModalOpen(true);
  };

  const handleUpdateMovie = async () => {
    if (Object.values(newMovie).some(value => !value)) {
      alert('Form tidak boleh kosong');
      return;
    }

    const formattedMovie = {
      ...newMovie,
      release_date: new Date(newMovie.release_date).toISOString().split('T')[0]
    };

    try {
      await axios.put(`${API_URL}/${editingMovie.id}`, formattedMovie);
      resetForm();
      fetchMovies();
    } catch (error) {
      console.error('Ada kesalahan saat mengupdate film:', error.message);
    }
  };

  const handleDeleteMovie = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus film ini?')) return;
    
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchMovies();
    } catch (error) {
      console.error('Ada kesalahan saat menghapus film:', error.message);
    }
  };

  const resetForm = () => {
    setNewMovie({ title: '', description: '', duration: '', release_date: '', image_url: '', price: '' });
    setIsModalOpen(false);
    setEditingMovie(null);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Daftar Film</h1>
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200 ease-in-out flex items-center gap-2"
          onClick={() => {
            setEditingMovie(null);
            setNewMovie({ title: '', description: '', duration: '', release_date: '', image_url: '', price: '' });
            setIsModalOpen(true);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Tambah Film
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">{editingMovie ? 'Edit Film' : 'Tambah Film Baru'}</h2>
            <div className="space-y-4">
              <input 
                type="text" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                placeholder="Judul Film"
                value={newMovie.title}
                onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
              />
              <textarea 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Deskripsi Film"
                rows="3"
                value={newMovie.description}
                onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
              />
                <input 
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Durasi (menit)"
                  value={newMovie.duration}
                  onChange={(e) => setNewMovie({ ...newMovie, duration: e.target.value })}
                />
              <input 
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={newMovie.release_date}
                onChange={(e) => setNewMovie({ ...newMovie, release_date: e.target.value })}
              />
              <input 
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="URL Gambar"
                value={newMovie.image_url}
                onChange={(e) => setNewMovie({ ...newMovie, image_url: e.target.value })}
              />
              <input 
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Harga"
                value={newMovie.price}
                onChange={(e) => setNewMovie({ ...newMovie, price: e.target.value })}
              />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button 
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-200"
                onClick={() => setIsModalOpen(false)}
              >
                Batal
              </button>
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                onClick={editingMovie ? handleUpdateMovie : handleAddMovie}
              >
                {editingMovie ? 'Update' : 'Tambah'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deskripsi</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durasi</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Rilis</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gambar</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {movies.map((movie, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{i + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{movie.title}</td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{movie.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{movie.duration} menit</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(movie.release_date).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rp {movie.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img 
                    src={movie.image_url} 
                    alt={movie.title} 
                    className="w-20 h-20 object-cover rounded-lg shadow-sm"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    className="text-blue-600 hover:text-blue-900 mr-4"
                    onClick={() => handleEditMovie(movie)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDeleteMovie(movie.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Movies;
