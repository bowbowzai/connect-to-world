import React from 'react'
import logoOnly from "../assets/logo_only.png"

const Footer = () => {
  return (
    <div className='footer'>
      <footer className="p-4  md:p-8 lg:p-10 dark:bg-gray-800">
        <div className="mx-auto max-w-screen-xl text-center">
          <a href="#" className="flex justify-center items-center text-xl font-semibold text-gray-900 dark:text-white">
            <img src={logoOnly} className="mr-3 h-8 sm:h-10" alt="Flowbite Logo" />
            ConnectToWorld
          </a>
          <p className="my-6 text-gray-500 dark:text-gray-400">Meet anyone on the earth by one decentralized platform.</p>
          <ul className="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">Premium</a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">FAQs</a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">Contact</a>
            </li>
          </ul>
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a className="hover:underline cursor-pointer">Ng Ju Peng</a>. All Rights Reserved.</span>
        </div>
      </footer>
    </div>
  )
}

export default Footer