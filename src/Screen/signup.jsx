import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import Navbar from '../components/navbar';
export default function Signup() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", location: "" });
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.location })
        })

        const json = await response.json();


        if (!json.success) {
            alert("Enter valid details");
        }

        if (json.success) {
            navigate("/");
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
                    <label htmlFor="Username">Username</label>
                    <input type="text" className="form-control" placeholder="Enter Name" name="name" value={credentials.name} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name="email" value={credentials.email} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name="password" value={credentials.password} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputLocation">Location</label>
                    <input type="text" className="form-control" id="exampleInputLocation" placeholder="location" name="location" value={credentials.location} onChange={onChange} />
                </div>
                <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
                <Link to="/login" className=' m-3 btn btn-danger'>Already a user</Link>
            </form>
        </div>
        </div>
    );
}

// body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.location })