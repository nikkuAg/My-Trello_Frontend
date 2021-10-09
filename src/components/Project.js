import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { Loader, Segment } from 'semantic-ui-react';
import parse from 'html-react-parser'
import { Error } from './Error';
import { MenuHeader } from './Menu';
import { Footer } from './Footer';
import './projectStyle.css'


export const Project = (props) => {
    const history = useHistory()
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
        let controller = new AbortController();
        let controller2 = new AbortController();
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
        axios.get(apiUrl2, {
            headers: {
                'Authorization': props.token,
            },
            signal: controller2.signal
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
        return () => {
            controller2?.abort()
            controller?.abort()
        }
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

    const listDetail = (id) => {
        history.push(`/my_list/${id}`)
    }

    return (
        <div>
            <MenuHeader id={id} active={'project'} project={true} login={props.login} disable={props.disable} admin={props.admin} />
            {loading || loading2 ? <Loader type="ThreeDots" color="black" height={80} width={80} /> :
                <>
                    {error.length > 0 ?
                        <Error message={error[0].details.detail} /> :
                        <div>
                            <>
                                {projects.find(o => o.id === parseInt(id)).creator.includes(parseInt(props.id)) || projects.find(o => o.id === parseInt(id)).team_members.includes(parseInt(props.id)) || props.admin ?
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
                                                        <p id="myLists" key={data.id} onClick={() => listDetail(data.id)}>{data.name}</p>
                                                    ))
                                                    : <p id="messageList">No List has been created for this project</p>}
                                            </div>
                                        </Segment>
                                    </>
                                    : <Error message="You are not part of this project" />}
                            </>
                        </div>
                    }
                </>}
            <Footer />
        </div >
    )
}
