import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
function Login() {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/loginuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        })

        const json = await response.json();

        if (!json.success) {
            alert(json.errors);
        }
        console.log(json);
        if (json.success) {
            localStorage.setItem("authToken", json.authToken);
            localStorage.setItem("userEmail", credentials.email);
            navigate("/home");
        }
    }

    function onChange(e) {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    return (
        <div style={{ height: "100vh", backgroundSize: 'cover' }}>
            <div>
                <Navbar />
            </div>
            <div className="container" >
                <form className='w-50 m-auto mt-5'>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name="email" value={credentials.email} onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name="password" value={credentials.password} onChange={onChange} />
                    </div>
                    <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
                    <Link to="/signup" className=' m-3 btn btn-danger'>New User</Link>
                </form>
            </div>
        </div>
    );
}

export default Login;