import React from 'react'
import { useState } from 'react'
import Axios from '../../Util/Axios.js';

const Login = () => {

    const [Data, setData] = useState({
        username: "",
        password: "",
    })

    async function handleSubmit(e) {
        e.preventDefault();

        console.log("Data : ", Data);


        try {

            const res = await Axios.post("/login", Data)

            console.log(res);


        } catch (error) {
            console.log("Error ", error);

        }

        setData({
            username: "",
            password: "",
        })

    }

    return (
        <div>
            <h1>Login Page</h1>
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
                <br />
                <button>Login</button>
            </form>



        </div>
    )
}

export default Login
