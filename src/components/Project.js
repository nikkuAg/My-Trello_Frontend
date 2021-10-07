import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Loader, Segment } from 'semantic-ui-react';
import parse from 'html-react-parser'
import { Error } from './Error';
import { MenuHeader } from './Menu';
import { Footer } from './Footer';
import './projectStyle.css'


export const Project = (props) => {
    const { id } = useParams()
    const apiUrl = 'http://127.0.0.1:8000/trello/project/';
    const apiUrl2 = 'http://127.0.0.1:8000/trello/list/';
    const [projects, setprojects] = useState([])
    const [list, setlist] = useState([])
    const [loading, setloading] = useState(true)
    const [loading2, setloading2] = useState(true)
    const [error, seterror] = useState([])
    const [self, setself] = useState({})
    const [selfList, setselfList] = useState([])
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
        axios.get(apiUrl2, {
            headers: {
                'Authorization': props.token,
            }
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
    }, [])
    useEffect(() => {
        if (!loading) {
            setself(projects.find(o => (o.id === parseInt(id))))
        }
    }, [loading])

    useEffect(() => {
        if (!loading2) {
            var data = []
            for (var x = 0; x < list.length; x++) {
                if (list[x].project === parseInt(id)) {
                    data.push(list[x])
                }
            }
            setselfList(data)
        }
    }, [loading2])
    return (
        <div>
            <MenuHeader id={id} active={'project'} project={true} login={props.login} disable={props.disable} admin={props.admin} />
            {loading || loading2 ? <Loader type="ThreeDots" color="black" height={80} width={80} /> :
                <>
                    {error.length > 0 ?
                        <Error message={error[0].details.detail} /> :
                        <div>
                            <>
                                <h1 id="title" className="extra">{self.name}</h1>

                                <Segment id="content">
                                    <h3 id="contentTitle" >Wiki:</h3>
                                    {parse(String(self.wiki))}
                                </Segment>
                                <Segment id="content" >
                                    <h3 id="contentTitle">Lists in this Project:</h3>
                                    <div id="lists">
                                        {selfList.length > 0 ?
                                            selfList.map(data => (
                                                <p key={data.id}>{data.name}</p>
                                            ))
                                            : <p id="messageList">No List has been created for this project</p>}
                                    </div>
                                </Segment>
                            </>

                        </div>
                    }
                </>}
            <Footer />
        </div >
    )
}
