import React from 'react'
import CountrySelection from '../components/CountrySelection'

const Home = () => {
  return (
    <div className='container max-w-[80%] mx-auto flex justify-center items-center p-5'>
      <div>
        <h2 className='mx-auto w-[50%] text-center text-xl font-semibold mb-7'>To video call someone from a specific country, simply click on the button with their country listed below.</h2>
        <div className='grid grid-cols-4 gap-y-5 gap-x-5'>
          <CountrySelection />
          <CountrySelection />
          <CountrySelection />
          <CountrySelection />
          <CountrySelection />
          <CountrySelection />
          <CountrySelection />
          <CountrySelection />
          <CountrySelection />
          <CountrySelection />
          <CountrySelection />
          <CountrySelection />
          <CountrySelection />
          <CountrySelection />
          <CountrySelection />
          <CountrySelection />
          <CountrySelection />
          <CountrySelection />
          <CountrySelection />
          <CountrySelection />
          <CountrySelection />
        </div>
      </div>
    </div>
  )
}

export default Home