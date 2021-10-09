import React from 'react'
import { useHistory } from 'react-router'
import { Divider, Icon } from 'semantic-ui-react'
import { Footer } from './Footer'
import { MenuHeader } from './Menu'
import { Error } from './Error'
import { Projects } from './Projects'
import './projectStyle.css'
import { Cards } from './Cards'

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
                                <input type="text" className="input" id="search" onChange={search} placeholder="Search Project Name" />
                                <input type="text" id="searchPeople" className="input" onChange={search} placeholder="Search User Name" />
                            </div>
                            <div className="classScroll">
                                <Icon id="left" name="arrow left" className="extra" size="big" onClick={() => slide("left", 'adminScroll')} />
                                <div id="adminScroll" className="cardsProject">
                                    <Projects id={props.id} token={props.token} users={props.users} admin={true} />
                                </div>
                                <Icon id="right" name="arrow right" className="extra" size="big" onClick={() => slide("right", 'adminScroll')} />
                            </div>
                            <div id="myError">
                                <Error message="No Project with given search" />
                            </div>
                            <Divider />
                            <div id="searchBox">
                                <h2 className="dasboardHeadings">All Cards</h2>
                                <input type="text" className="input" id="searchC" onChange={search1} placeholder="Search Project Name" />
                                <input type="text" id="searchCPeople" className="input" onChange={search1} placeholder="Search User Name" />
                            </div>
                            <div className="classScroll">
                                <Icon id="left" name="arrow left" className="extra" size="big" onClick={() => slide("left", 'adminCard')} />
                                <div id="adminCard" className="cardsProject">
                                    <Cards id={props.id} token={props.token} users={props.users} admin={true} />
                                </div>
                                <Icon id="right" name="arrow right" className="extra" size="big" onClick={() => slide("right", 'adminCard')} />
                            </div>
                            <div id="myError2">
                                <Error message="No Card with given search" />
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


function search1() {
    const name = document.querySelectorAll("#comming, #past, #today, #completed")
    const text = document.getElementById("searchC").value.toUpperCase()
    const text2 = document.getElementById("searchCPeople").value.toUpperCase()
    var count = 0
    for (var x = 0; x < name.length; x++) {
        if (name[x].firstElementChild.innerHTML.toUpperCase().indexOf(text) > -1) {
            var display = 0
            for (var y = 0; y < name[x].getElementsByClassName("searchP").length; y++) {
                console.log(x, y, '1')
                if (name[x].getElementsByClassName("searchP")[y].innerHTML.toUpperCase().indexOf(text2) > -1) {
                    display = 1
                }
            }
            console.log(x, display, '2')
            if (display === 1) {
                console.log("hi")
                name[x].style.display = "block"
                count--
            }
            else {
                console.log("hello")
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
        document.getElementById("myError2").style.display = "block"
    }
    else {
        document.getElementById("myError2").style.display = "none"
    }
}