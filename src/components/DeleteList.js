import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { Button } from 'semantic-ui-react'
import { Error } from './Error'
import { Footer } from './Footer'
import { MenuHeader } from './Menu'
import './projectStyle.css'


export const DeleteList = (props) => {
    const history = useHistory()
    const { id } = useParams()
    const [list, setlist] = useState([])
    const [project, setproject] = useState([])
    const [loading, setloading] = useState(true)
    const [loading2, setloading2] = useState(true)
    const [error, seterror] = useState([])
    const apiUrl = 'http://127.0.0.1:8000/trello/list/';
    useEffect(() => {
        let controller = new AbortController();
        axios.get(apiUrl, {
            headers: {
                'Authorization': props.token,
            },
            signal: controller.signal
        })
            .then(res => {
                setlist(res.data)
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
    const apiUrl2 = 'http://127.0.0.1:8000/trello/project/';
    useEffect(() => {
        let controller = new AbortController();
        if (!loading) {
            axios.get(apiUrl2, {
                headers: {
                    'Authorization': props.token,
                },
                signal: controller.signal
            })
                .then(res => {
                    setproject(res.data)
                    setloading2(false)
                })
        }
        return () => controller?.abort()

    }, [loading])
    const listDelete = () => {
        axios.delete(`${apiUrl}${id}/`, {
            headers: {
                'Authorization': props.token,
            }
        })
            .then(res => {
                alert("List Deleted")
                history.push('/dashboard')
            })
    }
    return (
        <div>
            <MenuHeader id={id} active={'delete'} list={true} login={props.login} disable={props.disable} admin={props.admin} />
            {loading || loading2 ? <></> :
                error.length > 0 ?
                    <Error message={error[0].details.detail} /> :
                    <>
                        {project.find(p => p.id === (list.find(o => (o.id === parseInt(id)))).project).creator.includes(parseInt(props.id)) || project.find(p => p.id === (list.find(o => (o.id === parseInt(id)))).project).team_members.includes(parseInt(props.id)) || props.admin ?
                            < div id="delete">
                                <h1 id="title" className="extra">Delete {list.find(o => (o.id === parseInt(id))).name}</h1>
                                <p id="messageList">Are you sure you want to delete this List!!</p>
                                <Button negative className="extra" onClick={listDelete}>Delete</Button>
                            </div>
                            : <Error message={"You are not part of the Project this List belongs!"} />}
                    </>
            }
            <Footer />
        </div >
    )
}
