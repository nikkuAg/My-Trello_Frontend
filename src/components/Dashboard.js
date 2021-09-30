import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from './Header';
import Loader from 'react-loader-spinner';
import { Test } from './test';
import { Projects } from './Projects';
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

    const settings = {
        dots: true,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3
    };
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
                        <div className="cards">
                            <Projects token={props.token} id={props.id} users={props.users} />
                        </div>
                        {/* Projects props = token, user id,  */}
                        <h2>Cards</h2>
                    </div>
                </div>
            </div>
        </>
    )


}
