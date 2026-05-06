import React, { useState } from 'react'
import axios from 'axios'
const App = () => {
  const [File, setFile] = useState()

  function handleChange(e) {
    console.log("Change...")
    const formData = new FormData()
    formData.append("file", e.target.files[0])
    console.log(e.target.files[0])

    setFile(formData)
  }


  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault()
        console.log("Submit...")
        async function FileData() {
          try {
            const res = await axios.post("http://localhost:3000/submit", File)

            console.log(res)
          } catch (error) {
            console.error("File Error", error.message)
          }
        }

        FileData()
      }}>
        <input type="file" name='file' onChange={handleChange} />
        <button type='submit'>submit</button>
      </form>
    </div>
  )
}

export default App
