import React from 'react'
import { useHistory } from 'react-router'
import { Footer } from './Footer'
import { MenuHeader } from './Menu'



export const UpdateUser = (props) => {
    const history = useHistory()
    return (
        <>
            {props.admin ?
                <div>
                    <MenuHeader active={'user'} login={props.login} disable={props.disable} admin={props.admin} />
                    <Footer />
                </div>
                : history.push("/dashboard")}
        </>
    )
}
