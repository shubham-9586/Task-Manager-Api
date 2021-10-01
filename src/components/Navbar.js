import React, { useEffect ,useState} from 'react'
import { useHistory } from 'react-router-dom';
import {
    Link,
    useLocation
} from "react-router-dom";
const  Navbar=(props)=>{
    let history=useHistory();

    const handleLogout=()=>{
        localStorage.removeItem('token');
        props.setFlag(true);
        props.showAlert("Logged out Successfully","success")
        history.push("/login");
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Navbar</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link location.pathname==='/'?"active":""`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link location.pathname==='/about'?"active":""`} to="/about">About</Link>
                        </li>

                    </ul>
                   {props.flag? <form className="d-flex">
                    <Link to="/login">   <button className="btn btn-primary mx-1" type="submit">Login</button></Link>
                   <Link to="/signup">     <button className="btn btn-primary mx-1" type="submit">Sign Up</button></Link>
                    </form>: <button onClick={handleLogout} className="btn btn-primary" type="submit" >Logout</button>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
