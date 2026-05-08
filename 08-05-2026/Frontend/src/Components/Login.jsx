import React from 'react'
import { useState } from 'react'
import axios from 'axios'
const Login = () => {

    const [User, setUser] = useState({
        name: "",
        email: "",
        profile: ""
    })

    const [Loading, setLoading] = useState(false)

    const [UserData, setUserData] = useState({
        email: "",
        password: ""
    })

    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();

                (async () => {
                    try {
                        setLoading(true)
                        const res =
                            await axios.post("http://localhost:3000/users/login", UserData)
                        console.log(res.data.user)
                        setUser({
                            name: res.data.user.name,
                            email: res.data.user.email,
                            profile: res.data.user.profile || ""
                        })

                    } catch (error) {
                        console.log(error)
                    } finally {
                        setLoading(false)
                    }
                })();

            }} >
                <input type="email" name='email' onChange={(e) => {
                    setUserData(p => ({ ...p, email: e.target.value }))
                }} />
                <br />
                <br />
                <input type="password" name='password' onChange={(e) => {
                    setUserData(p => ({ ...p, password: e.target.value }))
                }} />
                <br />
                <br />
                <button type='submit'>Login</button>
            </form>
            <br />
            <br />
            <a href="/register">register</a>
            <hr />
            <br />

            {Loading ? (<h1>Loading....</h1>) : (<>
                <div className="main">

                    <img src={User.profile} alt="Profile" height={200}
                        width={200} style={{ borderRadius: "50%" }} />
                    <hr />
                    <h1>Username : {User.name}</h1>
                    <h3>Password : {User.email}</h3>
                </div>
            </>)}
        </div>
    )
}

export default Login
