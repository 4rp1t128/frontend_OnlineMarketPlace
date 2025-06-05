import React, { useState } from 'react'
//import loginIcons from '../asset/signin.gif'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
//import imageTobase64 from '../helpers/imageTobase64'
import axios from 'axios';

const SignUp =  () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleOnChange = (e) => {
    const { name, value } = e.target

    setData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  /*const handleUploadPic = async (e) => {
    const file = e.target.files[0]
    if (file) {
      const imagePic = await imageTobase64(file)
      setData((prev) => ({
        ...prev,
        profilePic: imagePic,
      }))
    }
  }*/ 

  const handleSubmit = async (e) => {
  e.preventDefault()
  const { name, email, password, confirmPassword } = data

  if (password !== confirmPassword) {
    alert("Password doesn't match !!")
    return
  }

  try {
    const response = await axios.post('http://localhost:3001/api/v1/users/new', {
      name,
      email,
      password,
    })
    console.log('Signup successful:', response.data)
    navigate("/login")
  } catch (error) {
    console.error('Signup failed:', error)
  }
}

  return (
    <section id="signup">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto">
          {/*<div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={data?.profilePic || loginIcons} alt="login icon" />
            </div>

            <label>
              <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full">
                Upload Photo
              </div>
              <input type="file" className="hidden" onChange={handleUploadPic} />
            </label>
          </div>*/}

          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Name:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={data.name}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="grid">
              <label>Email:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

            <div>
              <label>Password:</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            <div>
              <label>Confirm Password:</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Enter confirm password"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
              Sign Up
            </button>
          </form>

          <p className="my-5">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-red-600 hover:text-red-700 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default SignUp

