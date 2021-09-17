import React, { useEffect, useState } from 'react'
import { Header } from './Header';
import './style.css'


export const Login = () => {
    const [click, setClick] = useState(false)
    useEffect(() => {
        if (click) {
            window.location.href = "http://localhost:8000/trello/login/"
        }
    });

    return (
        <>
            <Header navBar={false} />
            <div style={{ textAlign: "center", marginTop: "12rem" }}>
                <button onClick={() => setClick(true)} className="Login">Sign In with Omniport</button>
            </div>
        </>
    )
}
