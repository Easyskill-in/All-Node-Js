import React from 'react'
import axios from 'axios';
const App = () => {
  async function handleClick() {
    const res = await axios.get("http://localhost:3000/")
    console.log({ res })
  }
  return (
    <div>
      <button onClick={handleClick}>Click Me</button>
    </div>
  )
}

export default App
