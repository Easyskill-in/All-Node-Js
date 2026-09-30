import React from 'react'
import { useState } from 'react'
import Axios from './utils/axois'
import { useEffect } from 'react'

const App = () => {
  const [Task, setTask] = useState("")
  const [Data, setData] = useState([])
  async function handleSubmit(e) {
    e.preventDefault()
    console.log(Task)

    // const res = await Axios.post("/submit", { Task: Task })
    const res = await Axios.post("/submit", { Task })

    console.log("Res : ", res);

    fn()

    setTask("")
  }

  async function fn() {
    const res = await Axios.get("/all")
    console.log(res.data.data)

    setData(res.data.data)
  }


  useEffect(() => {

    fn();
  }, [])


  console.log(Data);
  console.log(Data.length);


  return (
    <div>
      <hr />
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Enter Your Task ' onChange={(e) => {
          setTask(e.target.value)
        }} value={Task} />
        <button type='submit'>submit</button>
      </form>
      <hr />
      <h1>Tasks</h1>
      <hr />
      <table border={2} cellPadding={10}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Task</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>

          {Data.length <= 0 ? <th colSpan={10}>No Data Yet..</th> : Data.map((value) => (
            <tr key={value.id}>
              <td>{value.id}</td>
              <td>{value.Task}</td>
              <td><button>delete</button></td>
              <td><button>update</button></td>
            </tr>
          ))}
        </tbody>

      </table>
    </div >
  )
}

export default App
