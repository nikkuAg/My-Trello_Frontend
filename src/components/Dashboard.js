import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Projects } from './Projects';
import { Cards } from './Cards';
import { MenuHeader } from './Menu';
import { Footer } from './Footer';
import { Error } from './Error'
import { Divider, Icon } from 'semantic-ui-react';
import './projectStyle.css'


export const Dashboard = (props) => {
    const apiUrl = `http://127.0.0.1:8000/trello/users/${props.id}`;
    const [user, setuser] = useState(null)
    useEffect(() => {
        let controller = new AbortController();
        axios.get(apiUrl, {
            headers: {
                'Authorization': props.token,
            },
            signal: controller.signal
        })
            .then(res => {
                setuser(res.data.name)
            })
        return () => controller?.abort()
    }, [apiUrl])

    window.onload = function () {
        if (!window.location.hash) {
            window.location = window.location + '#loaded';
            window.location.reload();
        }
    }

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
        <div>
            <MenuHeader login={props.login} disable={props.disable} admin={props.admin} />
            <div className="dashboardBox">
                <h1 className="dasboardHeadings">Your Dashboard</h1>
                <div className="contentProject">
                    <div id="searchBox">
                        <h2 className="dasboardHeadings">Your Projects</h2>
                        <input type="text" className="input" id="search" onChange={search} placeholder="Search Project Name" />
                        <input type="text" id="searchPeople" className="input" onChange={search} placeholder="Search User Name" />
                    </div>
                    <div className="classScroll">
                        <Icon id="left" name="arrow left" className="extra" size="big" onClick={() => slide("left", 'projectScroll')} />
                        <div id="projectScroll" className="cardsProject">
                            <Projects token={props.token} id={props.id} users={props.users} />
                        </div>
                        <Icon id="right" name="arrow right" className="extra" size="big" onClick={() => slide("right", 'projectScroll')} />
                    </div>
                    <div id="myError">
                        <Error message="No Project with given search" />
                    </div>
                    <Divider />
                    <div id="searchBox">
                        <h2 className="dasboardHeadings">Your Cards</h2>
                        <input type="text" className="input" id="searchC" onChange={search1} placeholder="Search Project Name" />
                        <input type="text" id="searchCPeople" className="input" onChange={search1} placeholder="Search User Name" />
                    </div>
                    <div className="classScroll">
                        <Icon id="left" name="arrow left" className="extra" size="big" onClick={() => slide("left", 'cardScroll')} />
                        <div id="cardScroll" className="cardsProject">
                            <Cards token={props.token} id={props.id} users={props.users} />
                        </div>
                        <Icon id="right" name="arrow right" className="extra" size="big" onClick={() => slide("right", 'cardScroll')} />
                    </div>
                    <div id="myError2">
                        <Error message="No Card with given search" />
                    </div>
                </div>
            </div>
            <Footer />
        </div >
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