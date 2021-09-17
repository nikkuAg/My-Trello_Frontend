import React from 'react';
import { Redirect } from 'react-router-dom';


export const Token = (props) => {
    let url_string = window.location.href;
    let url = new URL(url_string);
    let key = url.searchParams.get('token')
    let auth = 'Token '.concat(String(key));
    props.settoken(auth);
    setTimeout(localStorage.setItem('token', auth), 1000)
    return (
        <Redirect to="" />
    );
}





//Sending Request to get data from API
    // const apiUrl = "http://127.0.0.1:8000/trello/users/";
    // const header = new Headers();
    // header.append('Authorization', auth)
    // useEffect(() => {
    //     fetch(apiUrl, {
    //         headers: header,
    //     })
    //         .then(response => response.json())
    //         .then((data) => console.log(data))
    // })