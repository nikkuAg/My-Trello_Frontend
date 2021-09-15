import React from 'react';
import './style.css'

export const Header = (props) => {
    return (
        <>
            <div className="container">
                My Trello
            </div>
            {props.navBar ?

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
                    <button className="navItem">
                        Logout
                    </button>
                </div>
                : <></>
            }
        </>
    )
}
