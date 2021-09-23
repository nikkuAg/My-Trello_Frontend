import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from './Header';
import Loader from 'react-loader-spinner';

export const Dashboard = (props) => {
    const apiUrl = `http://127.0.0.1:8000/trello/users/${props.id}`;
    const [user, setuser] = useState(null)
    const [loading, setloading] = useState(true)
    useEffect(() => {
        axios.get(apiUrl, {
            headers: {
                'Authorization': props.token,
            }
        })
            .then(res => {
                setloading(false)
                setuser(res.data.name)
                console.log(res.data)
            })
    }, [apiUrl])
    console.log()
    return (
        <>
            <div>
                <Header navBar={props.navBar} login={props.login} disable={props.disable} admin={props.admin} />
                <div className="contentBox">
                    {loading ? <Loader type="ThreeDots" color="black" height={80} width={80} /> :
                        <h1>Welcome {user}</h1>
                    }
                    <div className="content">
                        <h2>Projects</h2>
                        <h2>Cards</h2>
                    </div>
                </div>
            </div>
        </>
    )


}
