import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ name: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', credentials);
      localStorage.setItem('token', response.data.token);
      navigate('/FE_YAKA');
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || 'Login failed');
      } else {
        setErrorMessage('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Selamat Datang!</h1>
            <p className="text-gray-600">Mohon Log In Untuk Melanjutkan</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {errorMessage && (
              <div className="bg-red-50 text-red-500 px-4 py-3 rounded-lg text-sm text-center">
                {errorMessage}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                  placeholder="Masukan Username Anda"
                  value={credentials.name}
                  onChange={(e) => setCredentials({ ...credentials, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                  placeholder="Masukan Password Anda"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Log In
            </button>

            <div className="text-center">
              <p className="text-gray-600">
                Admin Baru?{' '}
                <Link 
                  to="/FE_YAKA/register" 
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Buat Akunmu!
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;