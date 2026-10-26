import React from 'react'
import Axios from '../../Util/Axios';

const Home = () => {

    async function handleClick() {
        try {

            const res = await Axios.get("/")

            console.log(res);


        } catch (error) {
            console.log("Error ", error);

        }

    }
    return (
        <div>
            <h1>Home Page</h1>
            <hr />

            <button onClick={handleClick}>Get</button>
        </div>
    )
}

export default Home
