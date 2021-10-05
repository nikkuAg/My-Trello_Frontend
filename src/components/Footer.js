import React from 'react'
import { Icon } from 'semantic-ui-react'
import './style.css'


export const Footer = () => {
    const style = {
        backgroundColor: "#F8F8F8",
        borderTop: "1px solid #E7E7E7",
        textAlign: "center",
        padding: "1rem",
        height: "fitContent",
        width: "100%",
        fontSize: '1rem',
        marginTop: '2rem',
    }
    return (
        <div style={style}>
            Copyright <Icon name="copyright outline" size="small" className="extra" /> My Trello.
            All Rights are Reserved.
        </div>
    )
}
