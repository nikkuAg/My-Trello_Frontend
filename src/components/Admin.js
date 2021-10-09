import React from 'react'
import { useHistory } from 'react-router'
import { Icon } from 'semantic-ui-react'
import { Footer } from './Footer'
import { MenuHeader } from './Menu'
import { Error } from './Error'
import { Projects } from './Projects'
import './projectStyle.css'

export const Admin = (props) => {
    const history = useHistory()
    const slide = (direction, id) => {
        var container = document.getElementById(id);
        var scrollCompleted = 0;
        var slideVar = setInterval(function () {
            if (direction == 'left') {
                container.scrollLeft -= 30;
            } else {
                container.scrollLeft += 30;
            }
            scrollCompleted += 10;
            if (scrollCompleted >= 100) {
                window.clearInterval(slideVar);
            }
        }, 50);
    }

    return (
        <>
            {props.admin ?
                <div>
                    <MenuHeader active={'admin'} login={props.login} disable={props.disable} admin={props.admin} />
                    <div className="dashboardBox">
                        <h1 className="dasboardHeadings">Admin Page</h1>
                        <div className="contentProject">
                            <div id="searchBox">
                                <h2 className="dasboardHeadings">All Projects</h2>
                                <input type="text" id="search" onChange={search} placeholder="Search Project Name" />
                            </div>
                            <div className="classScroll">
                                <Icon id="left" name="arrow left" className="extra" size="big" onClick={() => slide("left", 'adminScroll')} />
                                <div id="adminScroll" className="cardsProject">
                                    <Projects id={props.id} token={props.token} users={props.users} admin={true} />
                                </div>
                                <Icon id="right" name="arrow right" className="extra" size="big" onClick={() => slide("right", 'adminScroll')} />
                            </div>
                            <div id="myError">
                                <Error message="No Projects with given search" />
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
                : history.push("/dashboard")}
        </>

    )
}


function search() {
    var name = document.querySelectorAll("[id='projectSearch']")
    var text = document.getElementById("search").value.toUpperCase()
    var count = 0
    console.log(count, "1")
    for (var x = 0; x < name.length; x++) {
        if (name[x].firstElementChild.innerHTML.toUpperCase().indexOf(text) > -1) {
            name[x].style.display = ""
            count--
        }
        else {
            count++
            name[x].style.display = "none"
        }
    }
    console.log(count)
    if (count === name.length) {
        document.getElementById("myError").style.display = "block"
    }
    else {
        document.getElementById("myError").style.display = "none"
    }
}