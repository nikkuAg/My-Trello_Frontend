import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Header } from './Header';
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
            <Redirect to={props.login ? "/header" : "/login"} />
            <Header navBar={false} />
            <div style={{ textAlign: "center", marginTop: "12rem" }}>
                <button onClick={() => setClick(true)} className="Login">Sign In with Omniport</button>
            </div>
        </>
    )
}
