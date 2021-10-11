import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Loader, Icon } from 'semantic-ui-react';
import { Footer } from './Footer'
import { MenuHeader } from './Menu'
import { Projects } from './Projects';
import { Error } from './Error';

export const AllProjects = (props) => {
    const apiUrl = 'http://127.0.0.1:8000/trello/project/';
    const [projects, setprojects] = useState([])
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState([])
    const projectList = []
    useEffect(() => {
        let controller = new AbortController();
        axios.get(apiUrl, {
            headers: {
                'Authorization': props.token,
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

    projects.map(project => {
        projectList.push(project)
        return null
    })
    const slide = (direction, id) => {
        var container = document.getElementById(id);
        var scrollCompleted = 0;
        var slideVar = setInterval(function () {
            if (direction == 'left') {
                container.scrollLeft -= 25;
            } else {
                container.scrollLeft += 25;
            }
            scrollCompleted += 20;
            if (scrollCompleted >= 100) {
                window.clearInterval(slideVar);
            }
        }, 50);
    }
    return (
        <>
            <MenuHeader active="all" login={props.login} disable={props.disable} admin={props.admin} />
            {loading ? <Loader type="ThreeDots" color="black" height={80} width={80} /> :
                <>
                    {projectList.length > 0 && props.users.length > 0 ?
                        <div className="contentProject">
                            <div id="searchBox">
                                <h2 className="dasboardHeadings">Your Projects</h2>
                                <input type="text" className="input" id="search" onChange={search} placeholder="Search Project Name" />
                                <input type="text" id="searchPeople" className="input" onChange={search} placeholder="Search User Name" />
                            </div>
                            <div className="classScroll">
                                <Icon id="left" name="arrow left" className="extra" size="big" onClick={() => slide("left", 'projectScroll')} />
                                <div id="projectScroll" className="cardsProject">
                                    <Projects wiki={true} admin={true} token={props.token} id={props.id} users={props.users} />
                                </div>
                                <Icon id="right" name="arrow right" className="extra" size="big" onClick={() => slide("right", 'projectScroll')} />
                            </div>
                            <div id="myError">
                                <Error message="No Project with given search" />
                            </div>
                        </div>
                        : <p>{error.length > 0 ? error[0].details.detail : ''}</p>

                    }
                </>
            }
            <Footer />
        </>
    )
}




function search() {
    const name = document.querySelectorAll("#projectSearch")
    const text = document.getElementById("search").value.toUpperCase()
    const text2 = document.getElementById("searchPeople").value.toUpperCase()
    var count = 0
    for (var x = 0; x < name.length; x++) {
        if (name[x].firstElementChild.innerHTML.toUpperCase().indexOf(text) > -1) {
            var display = 0
            for (var y = 0; y < name[x].getElementsByClassName("searchP").length; y++) {
                if (name[x].getElementsByClassName("searchP")[y].innerHTML.toUpperCase().indexOf(text2) > -1) {
                    display = 1
                }
            }
            if (display === 1) {
                name[x].style.display = "block"
                count--
            }
            else {
                count++
                name[x].style.display = "none"
            }
        }
        else {
            count++
            name[x].style.display = "none"
        }
    }
    if (count === name.length) {
        document.getElementById("myError").style.display = "block"
    }
    else {
        document.getElementById("myError").style.display = "none"
    }
}
