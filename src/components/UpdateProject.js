import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router'
import { Form, Loader } from 'semantic-ui-react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { Footer } from './Footer'
import { MenuHeader } from './Menu'
import { Error } from './Error'
import './create.css'


export const UpdateProject = (props) => {
    const history = useHistory()
    const [text, settext] = useState('')
    const [team, setteam] = useState([])
    const [error, seterror] = useState('')
    const [projects, setprojects] = useState([])
    const [loading, setloading] = useState(true)
    const [thisProject, setthisProject] = useState({})
    const { id } = useParams()

    var option = []
    for (var x = 0; x < props.users.length; x++) {
        option.push({ key: props.users[x].id, text: props.users[x].name, value: props.users[x].id })
    }
    const apiUrl = 'http://127.0.0.1:8000/trello/project/';
    const apiUrl2 = `http://localhost:8000/trello/project/${id}`

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
    }, [apiUrl])

    useEffect(() => {
        if (loading) {
            setthisProject(projects.find(o => o.id === parseInt(id)))
        }
    }, [loading])
    const submit = () => {
        var name = document.getElementById("name").value
        if (name !== '') {
            if (text !== '') {
                if (team.length !== 0) {
                    const data = {
                        "name": name,
                        "wiki": text,
                        "team_members": team,
                        "creator": [parseInt(props.id)]
                    }
                    axios.put(apiUrl, data, {
                        headers: {
                            'Authorization': props.token,
                        }
                    })
                        .then(res => {
                            alert(res.statusText)
                            history.push("/dashboard")
                        })
                        .catch(err => {
                            if (err.response) {
                                console.error(err.response)
                                seterror("Error in creating project!!")
                            }
                        })
                } else {
                    seterror("Select atleast one Team member.")
                }
            } else {
                seterror("Project wiki cannot be empty!!")
            }
        } else {
            seterror("Project name cannot be empty!!")
        }
    }
    return (
        <div>
            <MenuHeader active="update" id={id} login={props.login} disable={props.disable} admin={props.admin} />
            {loading ? <Loader type="ThreeDots" color="black" height={80} width={80} /> :
                <>
                    {error.length > 0 ?
                        <Error message={error[0].details.detail} /> :
                        <>
                            {thisProject.creator.includes(parseInt(props.id)) || thisProject.team_members.includes(parseInt(props.id)) ?
                                < div id="form">
                                    <h1>Update Project</h1>
                                    <Form>
                                        <Form.Group widths='equal' inline>
                                            <Form.Input id="name" fluid label='Name of Project' placeholder='Project Name' />
                                            <Form.Select
                                                id="team"
                                                fluid
                                                multiple
                                                label='Select Team Members'
                                                options={option}
                                                placeholder='Team Members'
                                                onChange={(event, { value }) => {
                                                    setteam(value)
                                                }}
                                            />
                                        </Form.Group>
                                        <label>Project Wiki</label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            label="Wiki"
                                            data={text}
                                            onChange={(event, editor) => {
                                                const data = editor.getData()
                                                settext(data)
                                            }} />
                                        <Form.Button onClick={submit}>Submit</Form.Button>
                                    </Form>
                                    <div id="error">
                                        <Error message={error} />
                                    </div>
                                </div>
                                : <Error message={"You are not part of this project!!!"} />
                            }

                        </>}
                </>
            }
            <Footer />
        </div >
    )
}
