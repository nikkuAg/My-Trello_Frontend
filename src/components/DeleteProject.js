import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { Button } from 'semantic-ui-react'
import { Error } from './Error'
import { Footer } from './Footer'
import { MenuHeader } from './Menu'
import './projectStyle.css'


export const DeleteProject = (props) => {
    const history = useHistory()
    const { id } = useParams()
    const [projects, setprojects] = useState([])
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState([])
    const apiUrl = 'http://127.0.0.1:8000/trello/project/';
    useEffect(() => {
        let controller = new AbortController();
        axios.get(apiUrl, {
            headers: {
                'Authorization': props.token,
            },
            signal: controller.signal
        })
            .then(res => {
                setprojects(res.data)
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
    const projectDelete = () => {
        axios.delete(`${apiUrl}${id}/`, {
            headers: {
                'Authorization': props.token,
            }
        })
            .then(res => {
                alert("Project Deleted")
                history.push('/dashboard')
            })
    }

    return (
        <div>
            <MenuHeader id={id} active={'delete'} project={true} login={props.login} disable={props.disable} admin={props.admin} />
            {loading ? <></> :
                error.length > 0 ?
                    <Error message={error[0].details.detail} /> :
                    <>
                        {projects.find(o => o.id === parseInt(id)).creator.includes(parseInt(props.id)) || projects.find(o => o.id === parseInt(id)).team_members.includes(parseInt(props.id)) || props.admin ?
                            <div id="delete">
                                <h1 id="title" className="extra">Delete {projects.find(o => (o.id === parseInt(id))).name}</h1>
                                <p id="messageList">Are you sure you want to delete this Project!!</p>
                                <Button negative className="extra" onClick={projectDelete}>Delete</Button>
                            </div>
                            : <Error message="You are not part of this project" />}
                    </>
            }
            <Footer />
        </div>
    )
}
