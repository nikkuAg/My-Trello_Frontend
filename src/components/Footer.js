import React from 'react'
import { Icon } from 'semantic-ui-react'
import './style.css'


export const Footer = () => {
    const style = {
        backgroundColor: "#e4e4e4",
        borderTop: "1px solid #E7E7E7",
        textAlign: "center",
        position: "fixed",
        bottom: "0",
        padding: "0.5rem",
        height: "fitContent",
        width: "100%",
        fontSize: '0.7rem',
        marginTop: '1rem',
        zIndex: "2",
    }
    return (
        <>
            <br /><br /><br />
            <div style={style}>
                Copyright <Icon name="copyright outline" size="small" className="extra" /> My Trello.
                All Rights are Reserved.
            </div>
        </>
    )
}
