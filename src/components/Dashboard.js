import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Projects } from './Projects';
import { Cards } from './Cards';
import { MenuHeader } from './Menu';
import { Footer } from './Footer';
import { Divider, Icon } from 'semantic-ui-react';
import './projectStyle.css'


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

    const slide = (direction, id) => {
        var container = document.getElementById(id);
        var scrollCompleted = 0;
        var slideVar = setInterval(function () {
            if (direction == 'left') {
                container.scrollLeft -= 25;
            } else {
                container.scrollLeft += 25;
            }
            scrollCompleted += 20;
            if (scrollCompleted >= 100) {
                window.clearInterval(slideVar);
            }
        }, 50);
    }

    return (
        <div>
            <MenuHeader login={props.login} disable={props.disable} admin={props.admin} />
            <div className="dashboardBox">
                <h1 className="dasboardHeadings">Your Dashboard</h1>
                <div className="contentProject">
                    <h2 className="dasboardHeadings">Your Projects</h2>
                    <div className="classScroll">
                        <Icon id="left" name="arrow left" className="extra" size="big" onClick={() => slide("left", 'projectScroll')} />
                        <div id="projectScroll" className="cardsProject">
                            <Projects token={props.token} id={props.id} users={props.users} />
                        </div>
                        <Icon id="right" name="arrow right" className="extra" size="big" onClick={() => slide("right", 'projectScroll')} />
                    </div>
                    <Divider />
                    <h2 className="dasboardHeadings">Your Cards</h2>
                    <div className="classScroll">
                        <Icon id="left" name="arrow left" className="extra" size="big" onClick={() => slide("left", 'cardScroll')} />
                        <div id="cardScroll" className="cardsProject">
                            <Cards token={props.token} id={props.id} users={props.users} />
                        </div>
                        <Icon id="right" name="arrow right" className="extra" size="big" onClick={() => slide("right", 'cardScroll')} />
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    )


}


