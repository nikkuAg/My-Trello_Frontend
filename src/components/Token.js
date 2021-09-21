import React from 'react';
import { Redirect } from 'react-router-dom';


export const Token = (props) => {
    let url_string = window.location.href;
    let url = new URL(url_string);
    let key = url.searchParams.get('token');
    let auth = 'Token '.concat(String(key));
    props.settoken(auth);
    sessionStorage.setItem('token', auth);
    props.setlogin(true);

    return (
        <Redirect to="" />
    );
}