import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router'
import { Form, Loader } from 'semantic-ui-react'
import { Footer } from './Footer'
import { MenuHeader } from './Menu'
import { Error } from './Error'
import './create.css'


export const UpdateList = (props) => {
    const history = useHistory()
    const [oldListName, setoldListName] = useState('')
    const [newProject, setnewProject] = useState('')
    const [error, seterror] = useState('')
    const [list, setlist] = useState([])
    const [loading, setloading] = useState(true)
    const [loading2, setloading2] = useState(true)
    const [project, setproject] = useState([])
    const [thisList, setthisList] = useState([])
    const { id } = useParams()
    const [option, setoption] = useState([])
    const apiUrl = 'http://127.0.0.1:8000/trello/list/';
    const apiUrl2 = `http://localhost:8000/trello/list/${id}/`
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
    }, [apiUrl])

    useEffect(() => {
        if (!loading) {
            var test = list.find(o => (o.id === parseInt(id)))
            setthisList(test)
            setnewProject(test.project)
            setoldListName(test.name)
        }
    }, [loading])
    useEffect(() => {
        let controller = new AbortController();
        if (!loading) {
            axios.get(apiUrl3, {
                headers: {
                    'Authorization': props.token,
                },
                signal: controller.signal
            })
                .then(res => {
                    setproject(res.data)
                    setloading2(false)
                })
                .catch(error => {
                    if (error.response) {
                        setloading(false)
                        seterror([{ 'details': error.response.data, 'status': error.response.status }])
                    }
                })
        }
        return () => controller?.abort()
    }, [thisList])
    useEffect(() => {
        if (project.length === 0) {
            setloading2(true)
        }
        if (!loading2) {
            var data = []
            for (var x = 0; x < project.length; x++) {
                data.push({ key: project[x].id, text: project[x].name, value: project[x].id })
            }
            setoption(data)
        }
    }, [loading2])
    const submit = () => {
        var name = document.getElementById("name").value
        if (name === '') {
            name = oldListName
        }
        const data = {
            "name": name,
            "project": newProject
        }
        axios.put(apiUrl2, data, {
            headers: {
                'Authorization': props.token,
            }
        })
            .then(res => {
                alert("List Updated")
                history.push('/dashboard')
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div>
            <MenuHeader id={id} active={'update'} list={true} login={props.login} disable={props.disable} admin={props.admin} />
            {loading || loading2 ? <Loader type="ThreeDots" color="black" height={80} width={80} /> :
                <>
                    {error.length > 0 ?
                        <Error message={error[0].details.detail} /> :
                        <>
                            {project.find(o => (o.id === parseInt(thisList.project))).creator.includes(parseInt(props.id)) || project.find(o => (o.id === parseInt(thisList.project))).team_members.includes(parseInt(props.id)) || props.admin ?
                                < div id="form">
                                    <h1>Update List</h1>
                                    <Form>
                                        <Form.Group widths='equal' inline>
                                            <Form.Input id="name" defaultValue={list.find(o => (o.id === parseInt(id))).name} fluid label='Name of List' placeholder='List Name' />
                                            {project.find(o => (o.id === parseInt(thisList.project))).creator.includes(parseInt(props.id)) || props.admin ?
                                                <>
                                                    <Form.Select
                                                        id="team"
                                                        fluid
                                                        label='Update Project'
                                                        options={option}
                                                        placeholder='Project'
                                                        onChange={(event, { value }) => {
                                                            setnewProject(value)
                                                        }}
                                                    />
                                                </>
                                                : <></>}
                                        </Form.Group>
                                        <Form.Button onClick={submit}>Submit</Form.Button>
                                    </Form>
                                    <div id="error">
                                        <Error message={error} />
                                    </div>
                                </div>
                                : <Error message={"You are not part of the Project this List belongs!"} />
                            }

                        </>}
                </>
            }
            <Footer />
        </div >
    )
}
