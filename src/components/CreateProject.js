import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router'
import { Form } from 'semantic-ui-react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { Footer } from './Footer'
import { MenuHeader } from './Menu'
import { Error } from './Error'
import './create.css'



export const CreateProject = (props) => {
    const history = useHistory()
    const [text, settext] = useState('')
    const [team, setteam] = useState([])
    const [error, seterror] = useState('')
    var option = []
    for (var x = 0; x < props.users.length; x++) {
        option.push({ key: props.users[x].id, text: props.users[x].name, value: props.users[x].id })
    }
    const apiUrl = "http://localhost:8000/trello/project/"
    const submit = (e) => {
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
                    axios.post(apiUrl, data, {
                        headers: {
                            'Authorization': props.token,
                        }
                    })
                        .then(res => {
                            alert('Project ' + res.statusText)
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
            <MenuHeader active="projects" login={props.login} disable={props.disable} admin={props.admin} />
            <div id="form">
                <h1>Create a New Project</h1>
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
            <Footer />
        </div>
    )
}
