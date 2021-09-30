import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import { Redirect, useHistory } from 'react-router-dom';
import { Menu, Icon } from 'semantic-ui-react';
import './menu.css';

export const MenuHeader = (props) => {
    const history = useHistory();
    const [state, setstate] = useState({ activeItem: props.active });
    const [click, setclick] = useState(true);
    const [windowWidth, setWindowWidth] = useState(0);
    let resizeWindow = () => {
        setWindowWidth(window.innerWidth);
    };
    useEffect(() => {
        resizeWindow();
        window.addEventListener("resize", resizeWindow);
        return () => window.removeEventListener("resize", resizeWindow);
    }, []);

    const redirect = (change) => {
        history.push(change);
    }
    const handleItemClick = (e, { name, path }) => {
        setstate({ activeItem: name });
        if (path === 'home') {
            history.push('/home');
        }
        else if (path === 'colleges' || path === "seats") {
            history.push(`/${path}/${name}`);
        }
        else {
            history.push(`/${path}`);
        }
    }
    function displayMenuMobile() {
        click ? setclick(false) : setclick(true);
    }

    useEffect(() => {
        if ((props.login === true)) {
            const element = document.getElementsByClassName('hamburgerIcon');
            ReactDOM.findDOMNode(element[0]).style.display === '' ? setclick(false) : setclick(true);
        }

    }, [windowWidth])

    useEffect(() => {
        if ((props.login === true)) {
            const elemnt = document.getElementsByClassName('hamburger');
            ReactDOM.findDOMNode(elemnt[0]).style.display = click ? 'block' : 'none';
        }
    }, [click])

    console.log(props.disable)
    console.log(props.admin)
    return (
        <>
            {props.disable ? redirect("/logout?q=This account is disabled!!") : <></>}
            {console.log("hello")}

            {props.login ?
                <>
                    <div>
                        <Menu className="navBar" borderless>
                            <Menu.Item
                                name='home'
                                active={state.activeItem === 'home'}
                                path='home'
                                onClick={handleItemClick}
                            >
                                Dasboard
                            </Menu.Item>
                            <Menu.Item
                                name='project'
                                active={state.activeItem === 'project'}
                                path='home'
                                onClick={handleItemClick}
                            >
                                Project
                            </Menu.Item>
                            {props.admin ?
                                <Menu.Item
                                    name='admin'
                                    active={state.activeItem === 'admin'}
                                    path='home'
                                    onClick={handleItemClick}
                                >
                                    Admin Page
                                </Menu.Item> : <></>}
                            <Menu.Item
                                name='logout'
                                active={state.activeItem === 'logout'}
                                onClick={handleItemClick}
                                path="logout"
                            >
                                Logout
                            </Menu.Item>
                        </Menu>
                    </div>
                    <div className="hamburger">
                        <Menu vertical borderless className="navBar">
                            <Menu.Item
                                name='home'
                                active={state.activeItem === 'home'}
                                onClick={handleItemClick}>
                                Dasboard
                            </Menu.Item>
                            <Menu.Item
                                name='project'
                                active={state.activeItem === 'project'}
                                onClick={handleItemClick}>
                                Project
                            </Menu.Item>
                            {props.admin ?
                                <Menu.Item
                                    name='admin'
                                    active={state.activeItem === 'admin'}
                                    onClick={handleItemClick}>
                                    Admin Page
                                </Menu.Item> : <></>}
                            <Menu.Item
                                name='logout'
                                active={state.activeItem === 'logout'}
                                onClick={handleItemClick}
                                path="logout"
                            >
                                Logout
                            </Menu.Item>
                        </Menu>
                    </div>
                    <div className="navigation">
                        <h1 className="heading menu" style={{ fontFamily: "'Pacifico', cursive" }}>My Trello</h1>
                        <Icon name="align justify" size="big" onClick={displayMenuMobile} className="hamburgerIcon" />
                    </div>
                </>
                : <Redirect to="/login" />}

        </>

    )
}

MenuHeader.defaultProps = {
    'active': 'home',
    'disable': false,
    'admin': false,
}
MenuHeader.prototype = {
    'active': PropTypes.string,
    'disable': PropTypes.bool,
    'admin': PropTypes.bool,
}