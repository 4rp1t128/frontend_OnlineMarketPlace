import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3001/api/v1/users/login',
        data,
        { withCredentials: true }
      );

      if (response.status === 200 && response.data.success) {
        // ✅ Store login state so header updates
        localStorage.setItem('isLoggedIn', 'true');
        console.log('Login success:', response.data);
        navigate('/home');
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      alert('Invalid Credentials !!');
    }
  };

  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto">
          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Email:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="enter email"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label>Password:</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="enter password"
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                  required
                />
                <div
                  className="cursor-pointer text-xl ml-2"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>

              <Link
                to="/forgot-password"
                className="block w-fit ml-auto hover:underline hover:text-red-600"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6"
            >
              Login
            </button>
          </form>

          <p className="my-5 text-center">
            Don't have an account?{' '}
            <Link
              to="/sign-up"
              className="text-red-600 hover:text-red-700 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
