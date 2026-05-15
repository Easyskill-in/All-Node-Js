import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const Login = () => {


    const nav = useNavigate();

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
        <div className="login-container">
            <div className="login-card">

                <h1 className="login-title">Login</h1>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();

                        (async () => {
                            try {
                                setLoading(true);

                                const res = await axios.post(
                                    "http://localhost:3000/users/login",
                                    UserData
                                );

                                setUser({
                                    name: res.data.user.name,
                                    email: res.data.user.email,
                                    profile: res.data.user.profile || "",
                                });
                                console.log(res.data.user._id);

                                localStorage.setItem("userId", res.data.user._id);
                                localStorage.setItem("isLogin", true);

                                nav("/")
                            } catch (error) {
                                console.log(error);
                            } finally {
                                setLoading(false);
                            }
                        })();
                    }}
                >
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            onChange={(e) => {
                                setUserData((p) => ({
                                    ...p,
                                    email: e.target.value,
                                }));
                            }}
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            onChange={(e) => {
                                setUserData((p) => ({
                                    ...p,
                                    password: e.target.value,
                                }));
                            }}
                        />
                    </div>

                    <button className="login-btn" type="submit">
                        Login
                    </button>
                </form>

                <div className="register-link">
                    <a href="/register">Create Account</a>
                </div>

                {Loading ? (
                    <div className="loading">Loading...</div>
                ) : (
                    User.name && (
                        <div className="user-card">
                            <img src={User.profile} alt="Profile" />
                            <h2>{User.name}</h2>
                            <p>{User.email}</p>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}

export default Login
