import React from 'react'
import './style.css'
import { Redirect } from 'react-router-dom';

export const Logout = (props) => {
    if (props.login) {
        sessionStorage.removeItem("token");
        props.setlogin(false);
    }
    return <Redirect to="" />
}
