import React from "react";
import axios from "axios";
import "./Register.css";
import { useNavigate } from "react-router-dom";
const Register = () => {

  const nav = useNavigate();
  const [userData, setUserData] = React.useState({
    username: "",
    email: "",
    password: "",
    file: null,
  });

  function handleChange(e) {
    const { name, value, files } = e.target;

    setUserData((prevData) => ({
      ...prevData,
      [name]: name === "file" ? files[0] : value,
    }));
  }

  return (
    <div className="register-container">
      <div className="register-card">

        <h1 className="register-title">Create Account</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();

            const formData = new FormData();

            formData.append("name", userData.username);
            formData.append("email", userData.email);
            formData.append("password", userData.password);
            formData.append("file", userData.file);

            (async () => {
              try {
                const res = await axios.post(
                  "http://localhost:3000/users/register",
                  formData
                );

                console.log(res);
                nav("/login");
              } catch (error) {
                console.log(error);
              }
            })();
          }}
        >
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Upload Profile</label>
            <input
              className="file-input"
              type="file"
              name="file"
              onChange={handleChange}
            />
          </div>

          <button className="register-btn" type="submit">
            Register
          </button>
        </form>

        <div className="login-link">
          <a href="/login">Already have an account? Login</a>
        </div>

        {userData.file && (
          <div className="preview">
            <p>Profile Preview</p>

            <img
              src={URL.createObjectURL(userData.file)}
              alt="preview"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;