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


export const UpdateCard = (props) => {
    const history = useHistory()
    const [oldCardTitle, setoldCardTitle] = useState('')
    const [oldDes, setoldDes] = useState('')
    const [oldcomplete, setoldcomplete] = useState()
    const [olddate, setolddate] = useState('')
    const [oldAssignee, setoldAssignee] = useState([])

    const [newList, setnewList] = useState('')
    const [newAssignee, setnewAssignee] = useState([])
    const [newDes, setnewDes] = useState('')

    const [error, seterror] = useState('')
    const [list, setlist] = useState([])
    const [card, setcard] = useState([])
    const [project, setproject] = useState([])
    const [loading, setloading] = useState(true)
    const [loading2, setloading2] = useState(true)
    const [loading3, setloading3] = useState(true)
    const [loading4, setloading4] = useState(true)
    const [thisCard, setthisCard] = useState({})
    const [thisList, setthisList] = useState({})
    const [thisProject, setthisProject] = useState({})
    const { id } = useParams()
    const apiUrl2 = 'http://127.0.0.1:8000/trello/list/';
    const apiUrl = 'http://127.0.0.1:8000/trello/card/'
    const apiUrl4 = `http://localhost:8000/trello/card/${id}/`
    const apiUrl3 = 'http://127.0.0.1:8000/trello/project/'

    var option = []
    for (var x = 0; x < props.users.length; x++) {
        option.push({ key: props.users[x].id, text: props.users[x].name, value: props.users[x].id })
    }

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
    }, [apiUrl])

    useEffect(() => {
        if (!loading) {
            var test = card.find(o => (o.id === parseInt(id)))
            setthisCard(test)
            setnewList(test.list)
            setoldCardTitle(test.title)
            setoldDes(test.description)
            setoldcomplete(test.complete)
            setolddate(test.due_date)
            setoldAssignee(test.assignee)
        }
    }, [loading])
    useEffect(() => {
        let controller = new AbortController();
        let controller2 = new AbortController();
        if (!loading) {
            axios.get(apiUrl2, {
                headers: {
                    'Authorization': props.token,
                },
                signal: controller.signal
            })
                .then(res => {
                    setloading2(false)
                    setlist(res.data)
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
                    setloading3(false)
                    setproject(res.data)
                })
                .catch(error => {
                    if (error.response) {
                        setloading3(false)
                        seterror([{ 'details': error.response.data, 'status': error.response.status }])
                    }
                })
        }
        return () => {
            controller2?.abort()
            controller?.abort()
        }
    }, [loading])
    useEffect(() => {
        if (!loading2) {
            setthisList(list.find(o => (o.id === thisCard.list)))
        }
    }, [list])
    useEffect(() => {
        if (!loading3 && Object.keys(thisList).length > 0) {
            setthisProject(project.find(o => (o.id === thisList.project)))
            setloading4(false)
        }
    }, [project])

    const submit = () => {
        var title = document.getElementById("name").value
        var date = document.getElementById("date").value
        var complete = document.getElementById("complete").checked
        var team = newAssignee
        var desc = newDes
        if (title === '') {
            title = oldCardTitle
        }
        if (date === '') {
            date = olddate
        }
        if (team.length === 0) {
            team = oldAssignee
        }
        if (desc === '') {
            desc = oldDes
        }
        const data = {
            "title": title,
            "due_date": date,
            "complete": complete,
            "assignee": team,
            "list": thisList.id,
            "description": desc
        }
        axios.put(apiUrl4, data, {
            headers: {
                'Authorization': props.token,
            }
        })
            .then(res => {
                alert("List Updated")
                history.push(`/my_card/${id}`)
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div>
            <MenuHeader id={id} active={'update'} card={true} login={props.login} disable={props.disable} admin={props.admin} />
            {loading || loading2 || loading3 || loading4 ? <Loader type="ThreeDots" color="black" height={80} width={80} /> :
                <>
                    {error.length > 0 ?
                        <Error message={error[0].details.detail} /> :
                        <>
                            {thisProject.creator.includes(parseInt(props.id)) || thisProject.team_members.includes(parseInt(props.id)) || props.admin ?
                                <div id="form">
                                    <h1>Update Card</h1>
                                    <Form>
                                        <Form.Group widths='equal' inline>
                                            <Form.Input id="name" defaultValue={oldCardTitle} fluid label='Card Title' placeholder='Card' />
                                            {thisProject.creator.includes(parseInt(props.id)) || props.admin ?
                                                <>
                                                    <Form.Select
                                                        id="team"
                                                        fluid
                                                        multiple
                                                        label='Update Assignee'
                                                        options={option}
                                                        defaultValue={oldAssignee.map(assignee => (assignee))}
                                                        placeholder='Assignee'
                                                        onChange={(event, { value }) => {
                                                            setnewAssignee(value)
                                                        }}
                                                    />
                                                </>
                                                : <></>}
                                            <Form.Input id="date" type="date" defaultValue={olddate} fluid label='Due Date' />
                                            <Form.Input type="checkbox" id="complete" defaultValue={oldcomplete} label="Completed" />
                                        </Form.Group>

                                        <label>Project Wiki</label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            label="Decription"
                                            data={oldDes}
                                            onChange={(event, editor) => {
                                                const data = editor.getData()
                                                setnewDes(data)
                                            }} />
                                        <Form.Button onClick={submit}>Submit</Form.Button>
                                    </Form>
                                    <div id="error">
                                        <Error message={error} />
                                    </div>
                                </div>
                                : <Error message={"You are not part of the Project this Card belongs!!!"} />
                            }

                        </>}
                </>
            }
            <Footer />
        </div >
    )
}
