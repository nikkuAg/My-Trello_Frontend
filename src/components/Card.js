import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import parse from 'html-react-parser'
import { Loader, Segment } from 'semantic-ui-react';
import { Error } from './Error';
import { MenuHeader } from './Menu';
import { Footer } from './Footer';
import './projectStyle.css'
import { Client } from './Client';


export const Card = (props) => {
    const { id } = useParams()
    const apiUrl3 = 'http://127.0.0.1:8000/trello/project/';
    const apiUrl2 = 'http://127.0.0.1:8000/trello/list/';
    const apiUrl = 'http://127.0.0.1:8000/trello/card/';
    const [projects, setprojects] = useState([])
    const [list, setlist] = useState([])
    const [card, setcard] = useState([])
    const [loading, setloading] = useState(true)
    const [loading2, setloading2] = useState(true)
    const [loading3, setloading3] = useState(true)
    const [error, seterror] = useState([])
    const [self, setself] = useState({})
    const [selflist, setselflist] = useState({})
    const [selfProject, setselfProject] = useState({})
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
    }, [])
    useEffect(() => {
        let controller = new AbortController();
        if (!loading) {
            setself(card.find(o => (o.id === parseInt(id))))

            axios.get(apiUrl2, {
                headers: {
                    'Authorization': props.token,
                },
                signal: controller.signal
            })
                .then(res => {
                    setlist(res.data)
                    setloading2(false)
                })
                .catch(error => {
                    if (error.response) {
                        setloading2(false)
                        seterror([{ 'details': error.response.data, 'status': error.response.status }])
                    }
                })
        }
        return () => controller?.abort()
    }, [loading])
    useEffect(() => {
        let controller = new AbortController();
        if (!loading2) {
            setselflist(list.find(o => (o.id === self.list)))

            axios.get(apiUrl3, {
                headers: {
                    'Authorization': props.token,
                },
                signal: controller.signal
            })
                .then(res => {
                    setprojects(res.data)
                    setloading3(false)
                })
                .catch(error => {
                    if (error.response) {
                        setloading3(false)
                        seterror([{ 'details': error.response.data, 'status': error.response.status }])
                    }
                })
        }
        return () => controller?.abort()
    }, [loading2])
    useEffect(() => {
        if (!loading3) {
            setselfProject(projects.find(o => o.id === selflist.project))
        }
    }, [loading3])
    return (
        <div>
            <MenuHeader id={id} active={'card'} card={true} login={props.login} disable={props.disable} admin={props.admin} />
            {loading || loading2 || loading3 || Object.keys(selfProject).length === 0 ? <Loader type="ThreeDots" color="black" height={80} width={80} /> :
                <>
                    {error.length > 0 ?
                        <Error message={error[0].details.detail} /> :
                        self.assignee.includes(parseInt(props.id)) || props.admin ?
                            <div>
                                <>
                                    <h1 id="title" className="extra">{self.title}</h1>

                                    <Segment id="content">
                                        <h3 id="contentTitle">Description:</h3>
                                        {parse(self.description)}
                                    </Segment>
                                    <Segment className="dueDate" id={self.complete ? "completed" : (new Date(String(self.due_date))) > (new Date()) ? "comming1" : (((new Date(String(self.due_date))).getDate() === (new Date()).getDate()) && ((new Date(String(self.due_date))).getMonth() === (new Date()).getMonth()) && ((new Date(String(self.due_date))).getFullYear() === (new Date()).getFullYear())) ? "today1" : "past"}>
                                        <h3 id="contentTitle" >Due Date:</h3>
                                        <p>{self.due_date}</p>
                                    </Segment>
                                    <Segment id="content">
                                        <h3 id="contentTitle">Project associtaed with:</h3>
                                        <p>{selfProject.name}</p>
                                        <div id="content" style={{ marginTop: '0px', }}>
                                            <h3 id="contentTitle">List associtaed with:</h3>
                                            <p>{selflist.name}</p>
                                        </div>
                                    </Segment>
                                    <Segment id="content">
                                        <h3 id="contentTitle">Comments:</h3>
                                        <Client users={props.users} id={props.id} cardId={id} token={props.token} />
                                    </Segment>
                                </>
                            </div>
                            : <Error message={"This Card is not assigned to you"} />
                    }
                </>}
            <Footer />
        </div >
    )
}
