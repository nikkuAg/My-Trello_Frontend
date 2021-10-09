import React from 'react'
import { useHistory } from 'react-router'
import { Icon } from 'semantic-ui-react'
import { Footer } from './Footer'
import { MenuHeader } from './Menu'
import { Projects } from './Projects'
import './projectStyle.css'

export const Admin = (props) => {
    const history = useHistory()
    const slide = (direction, id) => {
        var container = document.getElementById(id);
        var scrollCompleted = 0;
        var slideVar = setInterval(function () {
            if (direction == 'left') {
                container.scrollLeft -= 30;
            } else {
                container.scrollLeft += 30;
            }
            scrollCompleted += 10;
            if (scrollCompleted >= 100) {
                window.clearInterval(slideVar);
            }
        }, 50);
    }

    return (
        <>
            {props.admin ?
                <div>
                    <MenuHeader active={'admin'} login={props.login} disable={props.disable} admin={props.admin} />
                    <div className="dashboardBox">
                        <h1 className="dasboardHeadings">Admin Page</h1>
                        <div className="contentProject">
                            <h2 className="dasboardHeadings">All Projects</h2>
                            <div className="classScroll">
                                <Icon id="left" name="arrow left" className="extra" size="big" onClick={() => slide("left", 'adminScroll')} />
                                <div id="adminScroll" className="cardsProject">
                                    <Projects id={props.id} token={props.token} users={props.users} admin={true} />
                                </div>
                                <Icon id="right" name="arrow right" className="extra" size="big" onClick={() => slide("right", 'adminScroll')} />
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
                : history.push("/dashboard")}
        </>

    )
}
