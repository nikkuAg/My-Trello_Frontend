import React from 'react';
import './style.css'
import { Redirect, useHistory } from 'react-router-dom';

export const Header = (props) => {
    const history = useHistory();
    const redirect = () => {
        history.push("/logout");
    }

    return (
        <>
            <div className="container">
                My Trello
            </div>
            {
                props.login ?
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
                                    <button className="navItem">
                                        Admin Page
                                    </button>
                                    <button className="navItem" onClick={redirect} >
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