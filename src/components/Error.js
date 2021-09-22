import React from 'react'
import './style.css'

export const Error = ({ message }) => {

    return (
        message !== "" ?
            <div className="error">
                {message}
            </div> :
            <></>
    )
}


Error.defaultProps = {
    'message': ""
}