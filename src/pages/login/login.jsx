import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import Swal from 'sweetalert2';
import { motion } from "motion/react"

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const apiURL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiURL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        const isAdmin = data.user.is_admin;

        // Store the token in localStorage or sessionStorage
        localStorage.setItem('auth_token', data.token);

        if (isAdmin){
          navigate('/admin/dashboard');
        }
        else{
          navigate('/');
        }
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData.message);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorData.message,
          timer: 2000,
          showConfirmButton: false,
        }); 
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred. Please try again.',
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="login-page flex justify-center items-center min-h-screen bg-gray-100 ">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl bg-white rounded-lg shadow-md p-6 sm:p-8 md:p-10 m-6 sm:m-8 md:m-10">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center mb-6 sm:mb-8">Masuk</h2>
        <form onSubmit={handleSubmit} className="grid grid-rows-3 gap-3 sm:gap-4 md:gap-6">
          <div>
            <label htmlFor="email" className="block mb-1 text-sm sm:text-base font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 sm:p-3 bg-gray-200 rounded text-sm sm:text-base"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-sm sm:text-base font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 sm:p-3 bg-gray-200 rounded text-sm sm:text-base"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-3 text-gray-600 hover:text-gray-900 text-xs sm:text-sm"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          
          <motion.button
            whileHover={{ scale: 1.07}} 
            whileTap={{scale: 0.97}}
            type="submit"
            onClick={handleSubmit}
            className="mt-4 w-1/2 sm:w-1/3 bg-sky-500 text-white py-2 rounded hover:bg-blue-500 transition mx-auto text-sm sm:text-base"
          >
            Masuk
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
