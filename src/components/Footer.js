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
        padding: "1rem",
        height: "fitContent",
        width: "100%",
        fontSize: '1rem',
        marginTop: '2rem',
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
