import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router'
import { Form } from 'semantic-ui-react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { Footer } from './Footer'
import { MenuHeader } from './Menu'
import { Error } from './Error'
import './create.css'



export const CreateCard = (props) => {
    const history = useHistory()
    const { id } = useParams()
    const apiUrl2 = "http://localhost:8000/trello/list/"
    const apiUrl = "http://localhost:8000/trello/card/"
    const [list, setlist] = useState([])
    const [assignee, setassignee] = useState([])
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState([])
    const [text, settext] = useState('')
    const [formError, setformError] = useState('')

    var option = []
    for (var x = 0; x < props.users.length; x++) {
        option.push({ key: props.users[x].id, text: props.users[x].name, value: props.users[x].id })
    }

    useEffect(() => {
        axios.get(apiUrl2, {
            headers: {
                'Authorization': props.token,
            }
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
    }, [])
    const submit = (e) => {
        var title = document.getElementById("name").value
        var date = document.getElementById("date").value
        if (title !== '') {
            if (text !== '') {
                if (assignee.length !== 0) {
                    if (date !== '') {
                        const data = {
                            "title": title,
                            "description": text,
                            "assignee": assignee,
                            "list": parseInt(id),
                            "due_date": date,
                        }
                        console.log(data)
                        axios.post(apiUrl, data, {
                            headers: {
                                'Authorization': props.token,
                            }
                        })
                            .then(res => {
                                alert('Card' + res.statusText)
                                history.push(`/my_list/${id}`)
                            })
                            .catch(err => {
                                if (err.response) {
                                    console.log(err.response)
                                    seterror([{ 'details': err.response.data.title[0], 'status': err.response.status }])
                                }
                            })
                    } else {
                        setformError("Select due_date")
                    }
                } else {
                    setformError("Select atleast one Assignee.")
                }
            } else {
                setformError("Card Description cannot be empty!!")
            }
        } else {
            setformError("Card Title cannot be empty!!")
        }
    }
    return (
        <div>
            <MenuHeader active="card" list={true} id={id} login={props.login} disable={props.disable} admin={props.admin} />
            {loading ? <></> :
                error.length > 0 ?
                    <Error message={error[0].details} /> :
                    <div id="form">
                        <h1>Add a Card to {list.find(o => o.id === parseInt(id)).name}  </h1>
                        <Form>
                            <Form.Group widths='equal' inline>
                                <Form.Input id="name" fluid label='Title of Card' placeholder='Card Title' />
                                <Form.Select
                                    id="assignee"
                                    fluid
                                    multiple
                                    label='Select Assignee'
                                    options={option}
                                    placeholder='Assignee'
                                    onChange={(event, { value }) => {
                                        setassignee(value)
                                    }}
                                />
                                <Form.Input id="date" type="date" fluid label='Due Date' placeholder='' />
                            </Form.Group>
                            <label>Card Description</label>
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
                            {formError != '' ? <Error message={formError} /> : <></>}
                        </div>
                    </div>
            }
            <Footer />
        </div>
    )
}
