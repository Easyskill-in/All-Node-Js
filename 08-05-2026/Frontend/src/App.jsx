import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Login from './Components/Login'
import Register from './Components/Register'
import HomePage from './Components/HomePage'
import Post from './Components/Post'

const App = () => {
  return (
    <div>
      <h1 onClick={(e) => {
        window.location.href = "/";
      }}>Instagram Clone</h1>
      <hr />
      <nav>
        <ul>

          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>

            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/create-post">Post</Link>
          </li>
          <li>
            <button onClick={() => {
              localStorage.removeItem("userId");
              window.location.href = "/login";
            }}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
      <hr />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/create-post' element={<Post />} />
      </Routes>
    </div>
  )
}

export default App
