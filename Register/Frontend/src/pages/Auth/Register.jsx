import React from 'react'
import { useState } from 'react';
import Axios from '../../Util/Axios.js'
const Register = () => {

    const [Data, setData] = useState({
        username: "",
        password: "",
        email: ""
    })

    async function handleSubmit(e) {
        e.preventDefault();

        console.log("Data : ", Data);

        try {

            const res = await Axios.post("/Submit", Data)

            console.log(res);


        } catch (error) {
            console.log("Error ", error);

        }


        setData({
            username: "",
            password: "",
            email: ""
        })

    }
    return (
        <div>
            <h1>Register Page</h1>
            <hr />

            <form onSubmit={handleSubmit} className='form'>
                <input
                    type="text"
                    placeholder='Enter Your Username'
                    required
                    value={Data.username}
                    name='username'
                    onChange={(e) => {
                        setData(prev => ({ ...prev, [e.target.name]: e.target.value }))
                    }}
                />
                <br />

                <input
                    type="password"
                    placeholder='Enter Your Password'
                    required
                    value={Data.password}
                    name='password'
                    onChange={(e) => {
                        setData(prev => ({ ...prev, [e.target.name]: e.target.value }))
                    }}
                />
                <br />

                <input
                    type="email"
                    placeholder='Enter Your Email'
                    required
                    value={Data.email}
                    name='email'
                    onChange={(e) => {
                        setData(prev => ({ ...prev, [e.target.name]: e.target.value }))
                    }}
                />
                <br />

                <button>Login</button>
            </form>

        </div>
    )
}

export default Register
