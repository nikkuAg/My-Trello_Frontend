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
    const [oldProjectName, setoldProjectName] = useState('')
    const [oldtext, setoldtext] = useState('')
    const [oldteam, setoldteam] = useState([])
    const [oldcreator, setoldcreator] = useState([])
    const [text, settext] = useState('')
    const [team, setteam] = useState([])
    const [creator, setcreator] = useState([])
    const [error, seterror] = useState('')
    const [projects, setprojects] = useState([])
    const [loading, setloading] = useState(true)
    const [thisProject, setthisProject] = useState([])
    const { id } = useParams()

    var option = []
    for (var x = 0; x < props.users.length; x++) {
        option.push({ key: props.users[x].id, text: props.users[x].name, value: props.users[x].id })
    }
    const apiUrl = 'http://127.0.0.1:8000/trello/project/';
    const apiUrl2 = `http://localhost:8000/trello/project/${id}/`

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
    }, [apiUrl])

    useEffect(() => {
        if (!loading) {
            var data = []
            var test = projects.find(o => (o.id === parseInt(id)))
            setoldProjectName(test.name)
            setoldteam(test.team_members)
            setoldcreator(test.creator)
            setoldtext(test.wiki)
            for (var x = 0; x < test.creator.length; x++) {
                if (!data.includes(test.creator[x])) {
                    data.push(test.creator[x])
                }
            }
            for (var x = 0; x < test.team_members.length; x++) {
                if (!data.includes(test.team_members[x])) {
                    data.push(test.team_members[x])
                }
            }
            setthisProject(data)
        }
    }, [loading])
    const submit = () => {
        var name = document.getElementById("name").value
        var wiki = text
        var member = team
        var create = creator
        if (wiki === '') {
            wiki = oldtext
        }
        if (member.length === 0) {
            member = oldteam
        }
        if (create.length === 0) {
            create = oldcreator
        }
        if (name === '') {
            name = oldProjectName
        }
        console.log(text)
        const data = {
            "name": name,
            "wiki": wiki,
            "team_members": member,
            "creator": create
        }
        console.log(data)
        axios.put(apiUrl2, data, {
            headers: {
                'Authorization': props.token,
            }
        })
            .then(res => {
                alert("Project Updated")
                history.push(`/my_project/${id}/`)
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div>
            <MenuHeader active="update" project={true} id={id} login={props.login} disable={props.disable} admin={props.admin} />
            {loading ? <Loader type="ThreeDots" color="black" height={80} width={80} /> :
                <>
                    {error.length > 0 ?
                        <Error message={error[0].details.detail} /> :
                        <>
                            {thisProject.includes(parseInt(props.id)) || thisProject.includes(parseInt(props.id)) || props.admin ?
                                < div id="form">
                                    <h1>Update Project</h1>
                                    <Form>
                                        <Form.Group widths='equal' inline>
                                            <Form.Input id="name" defaultValue={projects.find(o => (o.id === parseInt(id))).name} fluid label='Name of Project' placeholder='Project Name' />
                                            {projects.find(o => (o.id === parseInt(id))).creator.includes(parseInt(props.id)) || props.admin ?
                                                <>
                                                    <Form.Select
                                                        id="team"
                                                        fluid
                                                        multiple
                                                        label='Update Team Members'
                                                        options={option}
                                                        defaultValue={oldteam.map(team => team)}
                                                        placeholder='Team Members'
                                                        onChange={(event, { value }) => {
                                                            setteam(value)
                                                        }}
                                                    />
                                                    <Form.Select
                                                        id="team"
                                                        fluid
                                                        multiple
                                                        label='Update Creator'
                                                        defaultValue={oldcreator.map(creator => creator)}
                                                        options={option}
                                                        placeholder='Creators'
                                                        onChange={(event, { value }) => {
                                                            setcreator(value)
                                                        }}
                                                    />
                                                </>
                                                : <></>}
                                        </Form.Group>
                                        <label>Project Wiki</label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            label="Wiki"
                                            data={oldtext}
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
