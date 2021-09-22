import React from 'react';
import { Redirect } from 'react-router-dom';


export const Token = (props) => {
    let url_string = window.location.href;
    let url = new URL(url_string);
    let key = url.searchParams.get('token');
    let admin = String(url.searchParams.get('admin'));
    let disable = String(url.searchParams.get('disable'));
    let auth = 'Token '.concat(String(key));
    props.settoken(auth);
    disable = (disable === "True" ? true : false);
    admin = (admin === "True" ? true : false);
    sessionStorage.setItem('token', auth);
    sessionStorage.setItem('admin', admin);
    sessionStorage.setItem('disable', disable);
    props.setlogin(true);
    props.setadmin(admin);
    props.setdisable(disable);

    return (
        <Redirect to="" />
    );
}