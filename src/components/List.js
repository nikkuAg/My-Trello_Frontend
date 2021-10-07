import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { Loader, Segment } from 'semantic-ui-react';
import { Error } from './Error';
import { MenuHeader } from './Menu';
import { Footer } from './Footer';
import './projectStyle.css'


export const List = (props) => {
    const history = useHistory()
    const { id } = useParams()
    const apiUrl = 'http://127.0.0.1:8000/trello/project/';
    const apiUrl2 = 'http://127.0.0.1:8000/trello/list/';
    const apiUrl3 = 'http://127.0.0.1:8000/trello/card/';
    const [projects, setprojects] = useState([])
    const [list, setlist] = useState([])
    const [card, setcard] = useState([])
    const [loading, setloading] = useState(true)
    const [loading2, setloading2] = useState(true)
    const [loading3, setloading3] = useState(true)
    const [error, seterror] = useState([])
    const [self, setself] = useState({})
    const [selfcard, setselfcard] = useState([])
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
    useEffect(() => {
        if (!loading) {
            axios.get(apiUrl, {
                headers: {
                    'Authorization': props.token,
                }
            })
                .then(res => {
                    setprojects(res.data)
                    setloading2(false)
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
                }
            })
                .then(res => {
                    setcard(res.data)
                    setloading3(false)
                })
                .catch(error => {
                    if (error.response) {
                        setloading3(false)
                        seterror([{ 'details': error.response.data, 'status': error.response.status }])
                    }
                })
        }
    }, [loading])
    useEffect(() => {
        if (!loading) {
            setself(list.find(o => (o.id === parseInt(id))))
        }
    }, [loading])
    useEffect(() => {
        if (!loading3) {
            var data = []
            for (var x = 0; x < card.length; x++) {
                console.log(card[x])
                if (card[x].list === parseInt(id)) {
                    data.push(card[x])
                }
            }
            setselfcard(data)
        }
    }, [loading3])
    console.log(self, selfcard, loading, loading3, loading2)

    return (
        <div>
            <MenuHeader id={id} active={'list'} list={true} login={props.login} disable={props.disable} admin={props.admin} />
            {loading || loading2 || loading3 ? <Loader type="ThreeDots" color="black" height={80} width={80} /> :
                <>
                    {error.length > 0 ?
                        <Error message={error[0].details.detail} /> :
                        projects.find(o => (o.id === self.project)).creator.includes(parseInt(props.id)) || projects.find(o => (o.id === self.project)).team_members.includes(parseInt(props.id)) ?
                            <div>
                                <>
                                    <h1 id="title" className="extra">{self.name}</h1>

                                    <Segment id="content">
                                        <h3 id="contentTitle" >Project associated with:</h3>
                                        <p>{projects.find(o => (o.id === self.project)).name}</p>
                                    </Segment>
                                    <Segment id="content" >
                                        <h3 id="contentTitle">Cards in this List:</h3>
                                        <div id="lists">
                                            {selfcard.length > 0 ?
                                                selfcard.map(data => (
                                                    <div key={data.id} className="project">
                                                        <h2 className="heading"> {data.title}</h2>
                                                        <p className="extra"><span className="desc date">Due Date: </span><span className="details">{data.due_date}</span></p>
                                                        <div><span className="desc">Assignee: </span>{data.assignee.map(member => (
                                                            <p className="details" key={member}>{props.users.find(o => o.id === member).name}</p>
                                                        ))}</div>
                                                    </div>
                                                ))
                                                : <p id="messageList">No Card has been created for this list</p>}
                                        </div>
                                    </Segment>
                                </>
                            </div>
                            : <></>
                    }
                </>}
            <Footer />
        </div >
    )
}
