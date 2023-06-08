import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <>
            <h1 className="text-center text-5xl " style={{ color: "#F59E0B", fontFamily: "Roboto", fontWeight: "bold", marginTop: "2rem" , marginBottom: "2rem"  }} >THE FLATBUY</h1>
            <div className="flex justify-center">
                <form className="w-1/3">
                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="email">Email</label>
                        <input className="border py-2 px-3 text-grey-800" type="text" name="email" id="email" placeholder="Email" />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="password">Password</label>
                        <input className="border py-2 px-3 text-grey-800" type="password" name="password" id="password" placeholder="Password" />
                    </div>
                    <div className="flex justify-center">
                        <Link to="/Homepage">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Login</button>
                        </Link>
                        <a style={{marginLeft:10}} href="http://127.0.0.1:5556/login">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button">Log in With Google</button>
                        </a>

                    </div>
                </form>
            </div>
        </>
           
       
    )
}

export default Login