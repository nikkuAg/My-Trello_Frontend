import React, { useEffect, useState } from 'react'
import './style.css'

export const Login = () => {
    const [click, setClick] = useState(false)

    useEffect(() => {
        if (click) {
            window.location.href = "https://www.google.com/"
        }
    });

    return (
        <div>
            <button onClick={() => setClick(true)} className="Login">Sign In with Omniport</button>
        </div>
    )
}
