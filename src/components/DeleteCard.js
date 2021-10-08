import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { Button } from 'semantic-ui-react'
import { Error } from './Error'
import { Footer } from './Footer'
import { MenuHeader } from './Menu'
import './projectStyle.css'


export const DeleteCard = (props) => {
    const history = useHistory()
    const { id } = useParams()
    const [card, setcard] = useState([])
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState([])
    const apiUrl = 'http://127.0.0.1:8000/trello/card/';
    useEffect(() => {
        axios.get(apiUrl, {
            headers: {
                'Authorization': props.token,
            }
        })
            .then(res => {
                setcard(res.data)
                setloading(false)
            })
            .catch(error => {
                if (error.response) {
                    setloading(false)
                    seterror([{ 'details': error.response.data, 'status': error.response.status }])
                }
            })
    }, [])
    const projectDelete = () => {
        axios.delete(`${apiUrl}${id}/`, {
            headers: {
                'Authorization': props.token,
            }
        })
            .then(res => {
                alert("Card Deleted")
                history.push('/dashboard')
            })
    }
    return (
        <div>
            <MenuHeader id={id} active={'delete'} card={true} login={props.login} disable={props.disable} admin={props.admin} />
            {loading ? <></> :
                error.length > 0 ?
                    <Error message={error[0].details.detail} /> :
                    <div id="delete">
                        <h1 id="title" className="extra">Delete {card.find(o => (o.id === parseInt(id))).title}</h1>
                        <p id="messageList">Are you sure you want to delete this Card!!</p>
                        <Button negative className="extra" onClick={projectDelete}>Delete</Button>
                    </div>
            }
            <Footer />
        </div>
    )
}
