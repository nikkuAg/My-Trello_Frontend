import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Error } from './Error';
import './style.css';


export const Login = (props) => {
    const [click, setClick] = useState(false)
    useEffect(() => {
        if (click) {
            window.location.href = "http://localhost:8000/trello/login/"
        }
    });
    return (
        <>
            <Redirect to={props.login ? "/dasboard" : "/login"} />
            <div className="heading">
                <h1 className="title" style={{ fontFamily: "'Pacifico', cursive" }}>My Trello</h1>
            </div>
            <div className="loginBox">
                <Error message={props.message !== "" ? props.message : ""} />
                <div className="loginButton">
                    <button onClick={() => setClick(true)} className="Login">Sign In with Omniport</button>
                </div>
            </div>
        </>
    )
}


Login.defaultProps = {
    'message': "",
}
