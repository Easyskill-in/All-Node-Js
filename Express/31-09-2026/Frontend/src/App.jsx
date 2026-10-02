import React from 'react'
import { useState } from 'react'
import Axios from './utils/axois'
import { useEffect } from 'react'

const App = () => {
  const [Task, setTask] = useState("")
  const [Data, setData] = useState([])
  const [isUpdateClicked, setIsUpdateClicked] = useState(false)
  const [Id, setId] = useState(0)

  async function handleSubmit(e) {
    e.preventDefault()
    console.log(Task)
    // const res = await Axios.post("/submit", { Task })
    // console.log("Res : ", res);

    if (isUpdateClicked) {
      const res = await Axios.put(`/update/${Id}`, { Task })
      console.log("Res : ", res);
      setIsUpdateClicked(false)
    } else {
      const res = await Axios.post("/submit", { Task })
      console.log("Res : ", res);
    }


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


  async function handleDelete(id) {
    try {
      const res = await Axios.delete(`/delete/${id}`)
      console.log(res);

      fn();

    } catch (error) {
      console.log("Error in Delete Data ", error)
    }
  }

  async function handleUpdate(id, MyTask) {
    try {
      setId(id)
      setIsUpdateClicked(true)
      setTask(MyTask)

    } catch (error) {
      console.log("Error in Delete Data ", error)
    }
  }

  console.log(Data);
  console.log(Data.length);


  return (
    <div>
      <hr />
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Enter Your Task ' onChange={(e) => {
          setTask(e.target.value)
        }} value={Task} />
        <button type='submit'>{isUpdateClicked ? "Update" : "Submit"}</button>
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
              <td><button onClick={() => { handleDelete(value.id) }}>delete</button></td>
              <td><button onClick={() => { handleUpdate(value.id, value.Task) }}>update</button></td>
            </tr>
          ))}
        </tbody>

      </table>
    </div >
  )
}

export default App
