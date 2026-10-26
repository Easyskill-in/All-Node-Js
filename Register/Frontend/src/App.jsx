import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'

const App = () => {
  return (
    <div>
      <h1>App Component</h1>
      <hr />

      <ul className='links'>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>

          <Link to="/login">Login</Link>
        </li>
        <li>

          <Link to="/register">Register</Link>
        </li>
      </ul>

      <hr />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>


    </div>
  )
}

export default App
