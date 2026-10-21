import React from 'react'
import Axios from './utils/axios';
const App = () => {
  async function get() {
    try {
      // const res = await axios.get("http://localhost:3000/")
      // const res = await Axios.get("/")
      const data = await Axios.post("/submit", { username: "Myname", age: 18 })

      // console.log(res);
      console.log(data.data);

    } catch (error) {
      console.log("APi Error ", error)
    }
  }
  return (
    <div>
      <h1>Hello React+Node</h1>
      <button onClick={() => {
        get()
      }}>Fetch</button>
    </div>
  )
}

export default App
