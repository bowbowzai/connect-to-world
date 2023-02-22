import React from 'react'
import malaysiaFlag from "../assets/malaysia.jpg"
import { useNavigate } from 'react-router-dom'

const CountrySelection = () => {
  const navigate = useNavigate()

  return (
    <div onClick={() => navigate("/call")} className="flex w-auto items-center justify-center cursor-pointer p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 gap-5">
      <div>
        <h6 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Malaysia</h6>
        <div className='flex items-center gap-1 text-sm text-gray-500'>
          <span className='block w-3 h-3 rounded-full bg-green-300'></span>
          <span>66 online</span>
        </div>
      </div>
      <img src={malaysiaFlag} alt="" className='w-12 h-12 rounded-full' />
    </div>
  )
}

export default CountrySelection