import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from 'react-loader-spinner'
import parse from 'html-react-parser'
import { useHistory } from 'react-router'
import './projectStyle.css'


export const Projects = ({ id, token, users, admin, wiki }) => {
    const apiUrl = 'http://127.0.0.1:8000/trello/project/';
    const [projects, setprojects] = useState([])
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState([])
    const projectList = []
    const history = useHistory()
    let myid = parseInt(id)
    useEffect(() => {
        let controller = new AbortController();
        axios.get(apiUrl, {
            headers: {
                'Authorization': token,
            },
            signal: controller.signal
        })
            .then(res => {
                setloading(false)
                setprojects(res.data)
            })
            .catch(error => {
                if (error.response) {
                    setloading(false)
                    seterror([{ 'details': error.response.data, 'status': error.response.status }])
                }
            })
        return () => controller?.abort()
    }, [apiUrl])

    if (admin) {
        projects.map(project => {
            projectList.push(project)

            return null
        })
    } else {
        projects.map(element => {
            if (element.team_members.includes(myid) || element.creator.includes(myid)) {
                projectList.push(element)
            }
            return null
        })
    }

    const projectDetail = (id) => {
        history.push(`/my_project/${id}`)
    }

    return (
        <>
            {loading ? <Loader type="ThreeDots" color="black" height={80} width={80} /> :
                <>
                    {projectList.length > 0 && users.length > 0 ?
                        projectList.map(element => (
                            <div id="projectSearch" key={element.id} className="project" value={element.id} onClick={() => projectDetail(element.id)}>
                                <h2 id="projectName" className="heading"> {element.name}</h2>
                                <p className="extra"><span className="desc">Date Created: </span><span className="details">{element.date_started}</span></p>
                                {wiki ? <><span className="desc">Wiki: </span> {parse(String(element.wiki))}</> : <></>}
                                <div id="team"><span className="desc">Team Members: </span>{element.team_members.map(member => (
                                    <p className="extra details searchP" key={member}>{users.find(o => o.id === member).name}</p>
                                ))}</div>
                                <div><span className="desc">Creator: </span>{element.creator.map(member => (
                                    <p className="details extra searchP" key={member}>{users.find(o => o.id === member).name}</p>
                                ))}</div>
                            </div>
                        ))
                        : <p>{error.length > 0 ? error[0].details.detail : ''}</p>

                    }
                </>
            }
        </>
    )
}


Projects.defaultProps = {
    'admin': false,
    'wiki': false
}