import React from 'react';
import './style.css'
import { Redirect, useHistory } from 'react-router-dom';

export const Header = (props) => {
    const history = useHistory();
    const redirect = (change) => {
        history.push(change);
    }
    return (
        <>
            {props.disable ? redirect("/logout?q=This account is disabled!!") : <></>}
            <div className="container">
                My Trello
            </div>
            {props.login ?
                <>
                    {
                        props.navBar ?
                            <div className="nav">
                                <button className="navItem">
                                    Dasboard
                                </button>
                                <button className="navItem">
                                    Project
                                </button>
                                {props.admin ?
                                    <button className="navItem">
                                        Admin Page
                                    </button> : <></>}
                                <button className="navItem" onClick={() => redirect("/logout")} >
                                    Logout
                                </button>
                            </div>
                            : <></>
                    }
                </>
                : <Redirect to="/login" />
            }
        </>
    )
}


Header.defaultProps = {
    'navBar': false,
}