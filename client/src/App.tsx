import { useEffect, useRef, useState } from 'react'

import { Routes, Route } from "react-router-dom"
import Login from './pages/Login'
import Footer from './components/Footer'
import Register from './pages/Register'
import Header from './components/Header'
import Home from './pages/Home'
import Calling from './pages/Calling'
import ForgotPassword from './pages/ForgotPassword'
import { useAppSelector } from './app/hooks'
import ResetPassword from './pages/ResetPassword'
import EmailActivation from './pages/EmailActivation'

function App() {
  const token = useAppSelector((state) => state.auth.token)
  return (
    <div className="relative app bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* {token != "" && <Header />} */}
      <Header />
      <div className='main'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/call" element={<Calling />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/email-activation" element={<EmailActivation />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </div>
      <Footer />
      {/* {token != "" && <Footer />} */}

    </div>
  )
}

export default App
