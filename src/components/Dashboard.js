import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from './Header';
import { Projects } from './Projects';
import { Cards } from './Cards';
import './projectStyle.css'


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
            })

    }, [apiUrl])

    window.onload = function () {
        if (!window.location.hash) {
            window.location = window.location + '#loaded';
            window.location.reload();
        }
    }
    return (
        <>
            <div>
                <Header navBar={props.navBar} login={props.login} disable={props.disable} admin={props.admin} />
                <div className="contentBox">
                    {loading ? <h1>Welcome</h1> :
                        <h1>Welcome {user}</h1>
                    }
                    <div className="content">
                        <h2>Projects</h2>
                        <div className="cards">
                            <Projects token={props.token} id={props.id} users={props.users} />
                        </div>
                        <h2>Cards</h2>
                        <div className="cards">
                            <Cards token={props.token} id={props.id} users={props.users} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )


}
