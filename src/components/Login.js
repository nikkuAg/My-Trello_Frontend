import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Error } from './Error';
import { Header } from './Header';
import './style.css';


export const Login = (props) => {
    const [click, setClick] = useState(false)
    useEffect(() => {
        if (click) {
            window.location.href = "http://localhost:8000/trello/login/"
        }
    });
    console.log(props.message + " login")
    return (
        <>
            <Redirect to={props.login ? "/header" : "/login"} />
            <Header navBar={false} login={props.login} />
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
