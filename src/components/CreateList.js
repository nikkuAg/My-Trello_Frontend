import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router'
import { Form } from 'semantic-ui-react'
import { Footer } from './Footer'
import { MenuHeader } from './Menu'
import { Error } from './Error'
import './create.css'



export const CreateList = (props) => {
    const history = useHistory()
    const { id } = useParams()
    const apiUrl2 = "http://localhost:8000/trello/list/"
    const [projects, setprojects] = useState([])
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState([])
    const [formError, setformError] = useState('')
    const apiUrl = 'http://127.0.0.1:8000/trello/project/';
    useEffect(() => {
        axios.get(apiUrl, {
            headers: {
                'Authorization': props.token,
            }
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
    }, [])
    const submit = (e) => {
        var name = document.getElementById("name").value
        if (name !== '') {
            const data = {
                "name": name,
                "project": projects.find(o => o.id === parseInt(id)).id
            }
            axios.post(apiUrl2, data, {
                headers: {
                    'Authorization': props.token,
                }
            })
                .then(res => {
                    alert('List ' + res.statusText + ' for ' + projects.find(o => o.id === parseInt(id)).name)
                    history.push(`/my_project/${id}`)
                })
                .catch(err => {
                    if (err.response) {
                        console.error(err.response)
                        seterror([{ 'details': err.response.data, 'status': err.response.status }])
                    }
                })

        } else {
            setformError("List name cannot be empty!!")
        }
    }
    return (
        <div>
            <MenuHeader active="list" project={true} id={id} login={props.login} disable={props.disable} admin={props.admin} />
            {loading ? <></> :
                error.length > 0 ?
                    <Error message={error[0].details.name} /> :
                    <div id="form">
                        <h1>Add a New List to {projects.find(o => o.id === parseInt(id)).name} </h1>
                        <Form>
                            <Form.Group widths='equal' inline>
                                <Form.Input id="name" fluid label='Name of List' placeholder='List Name' />
                            </Form.Group>
                            <Form.Button onClick={submit}>Submit</Form.Button>
                        </Form>
                        <div id="error">
                            {formError != '' ? <Error message={formError} /> : <></>}
                        </div>
                    </div>
            }
            <Footer />
        </div>
    )
}
