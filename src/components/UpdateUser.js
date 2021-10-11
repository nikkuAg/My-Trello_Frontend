import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { Button, Grid, Segment, Form } from 'semantic-ui-react'
import { Error } from './Error'
import { Footer } from './Footer'
import { MenuHeader } from './Menu'
import './user.css'

export const UpdateUser = (props) => {
    const history = useHistory()
    const [disable, setdisable] = useState(false)
    const [enable, setenable] = useState(false)
    const [role, setrole] = useState(false)
    const [userD, setuserD] = useState([])
    const [userE, setuserE] = useState([])
    const [userA, setuserA] = useState()
    const [userR, setuserR] = useState()
    const [error, seterror] = useState('')
    const options = []
    const optionD = []
    const optionE = []
    const optionR = [
        { key: "1", text: "Admin User", value: true },
        { key: "2", text: "Normal User", value: false },
    ]
    for (var x = 0; x < props.users.length; x++) {
        options.push({ key: props.users[x].id, text: props.users[x].name, value: props.users[x].id })
        if (!props.users[x].disabled) {
            optionD.push({ key: props.users[x].id, text: props.users[x].name, value: props.users[x].id })
        }
        else if (props.users[x].disabled) {
            optionE.push({ key: props.users[x].id, text: props.users[x].name, value: props.users[x].id })
        }
    }

    const adminClick = (type) => {
        if (type === "disable") {
            setdisable(!disable)
            setuserD([])
        }
        if (type === "enable") {
            setenable(!enable)
            setuserE([])
        }
        if (type === "role") {
            setrole(!role)
            setuserA()
            setuserR()
        }
    }

    const submit = (type) => {
        if (type === "disable") {
            if (userD.length > 0) {
                for (var x = 0; x < userD.length; x++) {
                    const apiUrl = `http://127.0.0.1:8000/trello/users/${userD[x]}/`
                    var test = props.users.find(o => o.id === parseInt(userD[x]))
                    const data = {
                        "username": test.username,
                        "name": test.name,
                        "disabled": true,
                    }
                    axios.put(apiUrl, data, {
                        headers: {
                            'Authorization': props.token,
                        }
                    })
                        .catch(err => {
                            seterror(err)
                            alert("Error in disabling users")
                        })
                }
                alert("User(s) disabled")
                window.location.reload()
            }
            else {
                seterror("Select atleast one user to disable")
            }
        }
        else if (type === "enable") {
            if (userE.length > 0) {
                for (var x = 0; x < userE.length; x++) {
                    const apiUrl = `http://127.0.0.1:8000/trello/users/${userE[x]}/`
                    var test = props.users.find(o => o.id === parseInt(userE[x]))
                    const data = {
                        "username": test.username,
                        "name": test.name,
                        "disabled": false,
                    }
                    axios.put(apiUrl, data, {
                        headers: {
                            'Authorization': props.token,
                        }
                    })
                        .catch(err => {
                            seterror(err)
                            alert("Error in enabling users")
                        })
                }
                alert("User(s) enabled")
            }
            else {
                seterror("Select atleast one user to enable")
            }
        }
        else if (type === "role") {
            if (userA) {
                if (userR !== null) {
                    const apiUrl = `http://127.0.0.1:8000/trello/users/${userA}/`
                    var test = props.users.find(o => o.id === parseInt(userA))
                    const data = {
                        "username": test.username,
                        "name": test.name,
                        "admin": userR,
                    }
                    axios.put(apiUrl, data, {
                        headers: {
                            'Authorization': props.token,
                        }
                    })
                        .then(res => {
                            alert("User role changed")
                        })
                        .catch(err => {
                            seterror(err)
                            alert("Error in changing role")
                        })

                } else {
                    seterror("Select role")
                }
            }
            else {
                seterror("Select user to change role")
            }
        }
    }

    return (
        <>
            {props.admin ?
                <div>
                    <MenuHeader active={'user'} login={props.login} disable={props.disable} admin={props.admin} />
                    <Segment id="updateUser">
                        {error !== '' ?
                            <> <Error message={error} /><br /><br /><br />
                                <Grid columns={3} divided relaxed='very'>
                                    <Grid.Column id="grid">
                                        <div>
                                            <Button className="extra" primary onClick={() => adminClick("disable")}>Disable User</Button>
                                        </div>
                                        {disable ?
                                            <Form id="formU">
                                                <Form.Select
                                                    fluid
                                                    multiple
                                                    label='Select Users to Disable'
                                                    options={optionD}
                                                    placeholder='Disable Users'
                                                    onChange={(e, { value }) => {
                                                        setuserD(value)
                                                    }}
                                                />
                                                <Button className="extra userBtn" onClick={() => submit("disable")} >Disable</Button>
                                            </Form>
                                            : <></>}
                                    </Grid.Column>
                                    <Grid.Column id="grid">
                                        <div>
                                            <Button className="extra" primary onClick={() => adminClick("enable")}>Enable User</Button>
                                        </div>
                                        {enable ?
                                            <Form id="formU">
                                                <Form.Select
                                                    fluid
                                                    multiple
                                                    label='Select Users to Enable'
                                                    options={optionE}
                                                    placeholder='Enable Users'
                                                    onChange={(e, { value }) => {
                                                        setuserE(value)
                                                    }}
                                                />
                                                <Button className="extra userBtn" onClick={() => submit("enable")} >Enable</Button>
                                            </Form>
                                            : <></>}
                                    </Grid.Column>
                                    <Grid.Column id="grid">
                                        <div>
                                            <Button className="extra" primary onClick={() => adminClick("role")}>Change Role of User</Button>
                                        </div>
                                        {role ?
                                            <Form id="form1U">
                                                <Form.Select
                                                    fluid
                                                    label='Select User '
                                                    options={options}
                                                    placeholder='Select User'
                                                    onChange={(e, { value }) => {
                                                        setuserA(value)
                                                    }}
                                                />
                                                <Form.Select
                                                    fluid
                                                    label='Select Role'
                                                    options={optionR}
                                                    placeholder='Role'
                                                    onChange={(e, { value }) => {
                                                        setuserR(value)
                                                    }}
                                                />
                                                <Button className="extra userBtn roleBtn" onClick={() => submit("role")} >Change Role</Button>
                                            </Form>
                                            : <></>}
                                    </Grid.Column>
                                </Grid> </> :
                            <Grid columns={3} divided relaxed='very'>
                                <Grid.Column id="grid">
                                    <div>
                                        <Button className="extra" primary onClick={() => adminClick("disable")}>Disable User</Button>
                                    </div>
                                    {disable ?
                                        <Form id="formU">
                                            <Form.Select
                                                fluid
                                                multiple
                                                label='Select Users to Disable'
                                                options={optionD}
                                                placeholder='Disable Users'
                                                onChange={(e, { value }) => {
                                                    setuserD(value)
                                                }}
                                            />
                                            <Button className="extra userBtn" onClick={() => submit("disable")} >Disable</Button>
                                        </Form>
                                        : <></>}
                                </Grid.Column>
                                <Grid.Column id="grid">
                                    <div>
                                        <Button className="extra" primary onClick={() => adminClick("enable")}>Enable User</Button>
                                    </div>
                                    {enable ?
                                        <Form id="formU">
                                            <Form.Select
                                                fluid
                                                multiple
                                                label='Select Users to Enable'
                                                options={optionE}
                                                placeholder='Enable Users'
                                                onChange={(e, { value }) => {
                                                    setuserE(value)
                                                }}
                                            />
                                            <Button className="extra userBtn" onClick={() => submit("enable")} >Enable</Button>
                                        </Form>
                                        : <></>}
                                </Grid.Column>
                                <Grid.Column id="grid">
                                    <div>
                                        <Button className="extra" primary onClick={() => adminClick("role")}>Change Role of User</Button>
                                    </div>
                                    {role ?
                                        <Form id="form1U">
                                            <Form.Select
                                                fluid
                                                label='Select User '
                                                options={options}
                                                placeholder='Select User'
                                                onChange={(e, { value }) => {
                                                    setuserA(value)
                                                }}
                                            />
                                            <Form.Select
                                                fluid
                                                label='Select Role'
                                                options={optionR}
                                                placeholder='Role'
                                                onChange={(e, { value }) => {
                                                    setuserR(value)
                                                }}
                                            />
                                            <Button className="extra userBtn roleBtn" onClick={() => submit("role")} >Change Role</Button>
                                        </Form>
                                        : <></>}
                                </Grid.Column>
                            </Grid>
                        }
                    </Segment>
                    <Footer />
                </div>
                : history.push("/dashboard")}
        </>
    )

}
