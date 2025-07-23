import React, { useEffect, useState } from 'react'
import { handleError, handlesuccess } from '../util';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const URL = 'http://localhost:8000/api/product';
        const headers = {
          headers: {
            "Authorization": localStorage.getItem('token')
          }
        }

        const response = await fetch(URL, headers);
        const result = await response.json();
        console.log("result", result);

        setProduct(result);
        console.log(result);

      } catch (error) {
        console.log("error", error);
      }
    }
    fetchData();
  }, [])

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      navigate('/login');
    } catch (error) {
      handleError(error);
    }

  }
  return (
    <>
      <div className='min-h-screen flex justify-center items-center gap-4'>
        {product.map((val, index) => {
          return <div key={index} className="w-80 bg-white shadow-lg rounded-lg p-4 border-1 border-[#0000ff62]">
            {/* <img
              src={val.img}
              alt={val.name}
              className="w-full h-48 object-cover rounded"
            /> */}
            <h2 className="mt-4 text-xl font-semibold">{val.name}</h2>
            <p className="text-gray-600">{val.name}</p>
            <p className="mt-2 text-red-600 font-bold">₹ {val.price}</p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Buy Now
            </button>
          </div>
        })}
        <div onClick={handleLogout} className="logout bg-[red] px-5 py-2 text-white uppercase rounded-2xl hover:bg-green-800 transition-all duration-300 cursor-pointer">Logout</div>
      </div>
    </>
  )
}

export default Home