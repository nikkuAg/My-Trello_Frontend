import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Projects } from './Projects';
import { Cards } from './Cards';
import { MenuHeader } from './Menu';
import './projectStyle.css'
import { Footer } from './Footer';
import { Divider } from 'semantic-ui-react';


export const Dashboard = (props) => {
    const apiUrl = `http://127.0.0.1:8000/trello/users/${props.id}`;
    const [user, setuser] = useState(null)
    useEffect(() => {
        axios.get(apiUrl, {
            headers: {
                'Authorization': props.token,
            }
        })
            .then(res => {
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
        <div>
            <MenuHeader login={props.login} disable={props.disable} admin={props.admin} />
            <div className="dashboardBox">
                <h1 className="dasboardHeadings">Welcome {user}</h1>
                <div className="contentProject">
                    <h2 className="dasboardHeadings">Your Projects</h2>
                    <div className="cardsProject">
                        <Projects token={props.token} id={props.id} users={props.users} />
                    </div>
                    <Divider />
                    <h2 className="dasboardHeadings">Your Cards</h2>
                    <div className="cardsProject">
                        <Cards token={props.token} id={props.id} users={props.users} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )


}
