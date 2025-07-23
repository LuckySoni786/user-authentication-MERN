import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { handleError, handlesuccess } from '../util.js';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    const { name, value } = e.target;
    console.log(name, value);
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value

    }

    ))
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password } = formData;

    if (!username || !email || !password) {
      return handleError("name, email and password are required")
    }
    try {
      const URL = 'http://localhost:8000/api/user/register '
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      const { message, success } = result;

      if (success) {
        handlesuccess(message);
        setTimeout(()=>{
          navigate('/login');
        },3000)
      } else if (!success) {
        handleError(result.message);
        console.log(result.message);

      }
      // console.log("result", result);

    } catch (error) {
      handleError(error);
      console.log("error:", error);

    }
  }


  return (
    <>
      <div className='h-[100vh] flex justify-center items-center flex-col gap-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 w-full'>

        <div className="bg-[#ffffff] rounded-xl shadow-2xl flex justify-center items-center flex-col gap-6 px-5 py-6">
          <h2 className='text-3xl fw-bold '>Register</h2>
          <form className='flex flex-col gap-6' onSubmit={handleSubmit}>


            <input
              className='border-2 border-gray-400 rounded w-[320px] h-[50px] px-3'
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}

            />
            <input
              className='border-2 border-gray-400 rounded w-[320px] h-[50px] px-3'
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}

            />

            <input
              className='border-2 border-gray-400 rounded w-[320px] h-[50px] px-3'
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}


            />

            <button className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded' type="submit">Register</button>

            <span className='text-center'>Already have Account? ? <Link className='text-blue-700' to={'/login'}>Login</Link></span>
          </form>


        </div>

      </div>
    </>
  )
}

export default Signup