import React, { useState } from 'react'
import axios from 'axios'
const App = () => {
  const [File, setFile] = useState()
  const [Image, setImage] = useState("Test")
  const [Loading, setLoading] = useState(false)

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
            setLoading(true)
            const res = await axios.post("http://localhost:3000/submit", File)

            console.log(res.data.result.secure_url)
            setImage(res.data.result.secure_url)
          } catch (error) {
            console.error("File Error", error.message)
          } finally {
            setLoading(false)
          }
        }

        FileData()
      }}>
        <input type="file" name='file' onChange={handleChange} />
        <button type='submit'>submit</button>
      </form>

      <hr />
      {Loading ? (<h1>Loading....</h1>) : (<img src={Image} alt='User Image' height={400} />)}
    </div>
  )
}

export default App
