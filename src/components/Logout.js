import React from 'react'
import './style.css'
import { Redirect } from 'react-router-dom';

export const Logout = (props) => {
    let test = ""
    if (props.login) {
        let url_string = window.location.href;
        let url = new URL(url_string);
        test = String(url.searchParams.get('q'));
        console.log(test + " logout");
        if (test !== 'null') {
            props.error(test)
        }
        else {
            props.error("")
        }
        localStorage.removeItem("token");
        localStorage.removeItem("admin");
        localStorage.removeItem("disable");
        localStorage.removeItem("id");
        props.setlogin(false);
    }
    return <Redirect to="" />
}
