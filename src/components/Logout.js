import React from 'react'
import './style.css'
import { Redirect } from 'react-router-dom';

export const Logout = (props) => {
    let test = ""
    let url_string = window.location.href;
    let url = new URL(url_string);
    test = String(url.searchParams.get('q'));
    if (test !== 'null') {
        props.error(test)
    }
    else {
        props.error("")
    }
    if (props.login) {
        localStorage.removeItem("token");
        localStorage.removeItem("admin");
        localStorage.removeItem("disable");
        localStorage.removeItem("id");
    }
    props.setlogin(false);
    return <Redirect to="" />
}
