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
    const [list, setlist] = useState([])
    const [loading2, setloading2] = useState(true)
    const [project, setproject] = useState([])
    const [loading3, setloading3] = useState(true)
    const [error, seterror] = useState([])
    const apiUrl = 'http://127.0.0.1:8000/trello/card/';
    const apiUrl2 = 'http://127.0.0.1:8000/trello/list/'
    const apiUrl3 = 'http://127.0.0.1:8000/trello/project/'
    useEffect(() => {
        let controller = new AbortController();
        axios.get(apiUrl, {
            headers: {
                'Authorization': props.token,
            },
            signal: controller.signal
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
        return () => controller?.abort()
    }, [])
    useEffect(() => {
        let controller = new AbortController();
        let controller2 = new AbortController();
        axios.get(apiUrl2, {
            headers: {
                'Authorization': props.token,
            },
            signal: controller.signal
        })
            .then(res => {
                setlist(res.data)
                setloading2(false)
            })
            .catch(error => {
                if (error.response) {
                    setloading2(false)
                    seterror([{ 'details': error.response.data, 'status': error.response.status }])
                }
            })
        axios.get(apiUrl3, {
            headers: {
                'Authorization': props.token,
            },
            signal: controller2.signal
        })
            .then(res => {
                setproject(res.data)
                setloading3(false)
            })
            .catch(error => {
                if (error.response) {
                    setloading3(false)
                    seterror([{ 'details': error.response.data, 'status': error.response.status }])
                }
            })

        return () => {
            controller2?.abort()
            controller?.abort()
        }
    }, [loading])
    const cardDelete = () => {
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
            {loading || loading3 || loading2 ? <></> :
                error.length > 0 ?
                    <Error message={error[0].details.detail} /> :
                    <>
                        {project.find(o => (o.id === list.find(p => p.id === card.find(o => (o.id === parseInt(id))).list).project)).creator.includes(parseInt(props.id)) || project.find(o => (o.id === list.find(p => p.id === card.find(o => (o.id === parseInt(id))).list).project)).team_members.includes(parseInt(props.id)) || props.admin ?
                            <div id="delete">
                                <h1 id="title" className="extra">Delete {card.find(o => (o.id === parseInt(id))).title}</h1>
                                <p id="messageList">Are you sure you want to delete this Card!!</p>
                                <Button negative className="extra" onClick={cardDelete}>Delete</Button>
                            </div>
                            : <Error message="You are not part of the Project this Card belongs" />}
                    </>
            }
            <Footer />
        </div>
    )
}
