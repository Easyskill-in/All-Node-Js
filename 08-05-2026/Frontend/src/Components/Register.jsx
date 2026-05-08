import React from 'react'
import axios from 'axios'
const Register = () => {
  const [userData, setUserData] = React.useState({
    name: "",
    email: "",
    password: "",
    file: null
  });

  function handleChange(e) {
    const { name, value, files } = e.target;

    setUserData((prevData) => (
      {
        ...prevData,
        [name]: name === "file" ? files[0] : value,
      }))



  }


  return (
    <div>
      <form onSubmit={(e) => {

        e.preventDefault();

        const formData = new FormData();

        formData.append("name", userData.username);
        formData.append("email", userData.email);
        formData.append("password", userData.password);
        formData.append("file", userData.file);


        (async () => {
          try {
            const res = await axios.post("http://localhost:3000/users/register", formData)
            console.log(res)
          } catch (error) {
            console.log(error)
          }
        })();

      }}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} /><br /><br />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} /><br /><br />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} /><br /><br />
        <input type="file" name='file' onChange={handleChange} /><br /><br />
        <button type="submit">Register</button>
      </form>
      <br />
      <br />
      <a href="/login">login</a>
    </div>
  )
}

export default Register
