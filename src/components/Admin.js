import React from 'react'
import { useHistory } from 'react-router'
import { Footer } from './Footer'
import { MenuHeader } from './Menu'
import { Projects } from './Projects'
import './projectStyle.css'

export const Admin = (props) => {
    const history = useHistory()
    return (
        <>
            {props.admin ?
                <div>
                    <MenuHeader active={'admin'} login={props.login} disable={props.disable} admin={props.admin} />
                    <div className="dashboardBox">
                        <h1 className="dasboardHeadings">Admin Page</h1>
                        <div className="contentProject">
                            <h2 className="dasboardHeadings">All Projects</h2>
                            <div className="cardsProject">
                                <Projects id={props.id} token={props.token} users={props.users} admin={true} />
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
                : history.push("/dashboard")}
        </>

    )
}
