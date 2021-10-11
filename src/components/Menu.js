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
        if ((props.project || props.list || props.card) && (path !== "dashboard" && path !== "create_project" && path !== "admin" && path !== "logout")) {
            history.push(`/${path}/${props.id}`)
        }
        else {
            history.push(`/${path}`)
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

    return (
        <>
            {props.disable ? redirect("/logout?q=This account is disabled!!") : <></>}

            {props.login ?
                <>
                    <div>
                        <Menu className="navBar" borderless>
                            <Menu.Item
                                name='home'
                                active={state.activeItem === 'home'}
                                path='dashboard'
                                onClick={handleItemClick}
                            >
                                Dasboard
                            </Menu.Item>
                            {!props.project && !props.list && !props.card ?
                                <Menu.Item
                                    name='projects'
                                    active={state.activeItem === 'projects'}
                                    path='create_project'
                                    onClick={handleItemClick}
                                >
                                    Create Project
                                </Menu.Item>
                                : !props.list && !props.card ?
                                    <>
                                        <Menu.Item
                                            name='project'
                                            active={state.activeItem === 'project'}
                                            path='my_project'
                                            onClick={handleItemClick}
                                        >
                                            Project
                                        </Menu.Item>
                                        <Menu.Item
                                            name='update'
                                            active={state.activeItem === 'update'}
                                            path='update_project'
                                            onClick={handleItemClick}
                                        >
                                            Update Project
                                        </Menu.Item>
                                        <Menu.Item
                                            name='delete'
                                            active={state.activeItem === 'delete'}
                                            path='delete_project'
                                            onClick={handleItemClick}
                                        >
                                            Delete Project
                                        </Menu.Item>
                                        <Menu.Item
                                            name='list'
                                            active={state.activeItem === 'list'}
                                            path='create_list'
                                            onClick={handleItemClick}
                                        >
                                            Add List
                                        </Menu.Item>
                                    </> : !props.card ?
                                        <>
                                            <Menu.Item
                                                name='list'
                                                active={state.activeItem === 'list'}
                                                path='my_list'
                                                onClick={handleItemClick}
                                            >
                                                List
                                            </Menu.Item>
                                            <Menu.Item
                                                name='update'
                                                active={state.activeItem === 'update'}
                                                path='update_list'
                                                onClick={handleItemClick}
                                            >
                                                Update List
                                            </Menu.Item>
                                            <Menu.Item
                                                name='delete'
                                                active={state.activeItem === 'delete'}
                                                path='delete_list'
                                                onClick={handleItemClick}
                                            >
                                                Delete List
                                            </Menu.Item>
                                            <Menu.Item
                                                name='card'
                                                active={state.activeItem === 'card'}
                                                path='create_card'
                                                onClick={handleItemClick}
                                            >
                                                Add Card
                                            </Menu.Item>
                                        </> :
                                        <>
                                            <Menu.Item
                                                name='card'
                                                active={state.activeItem === 'card'}
                                                path='my_card'
                                                onClick={handleItemClick}
                                            >
                                                Card
                                            </Menu.Item>
                                            <Menu.Item
                                                name='update'
                                                active={state.activeItem === 'update'}
                                                path='update_card'
                                                onClick={handleItemClick}
                                            >
                                                Update Card
                                            </Menu.Item>
                                            <Menu.Item
                                                name='delete'
                                                active={state.activeItem === 'delete'}
                                                path='delete_card'
                                                onClick={handleItemClick}
                                            >
                                                Delete Card
                                            </Menu.Item>
                                        </>
                            }
                            {props.admin ?
                                <>
                                    <Menu.Item
                                        name='admin'
                                        active={state.activeItem === 'admin'}
                                        onClick={handleItemClick}
                                        path="admin">
                                        Admin Page
                                    </Menu.Item>
                                    <Menu.Item
                                        name='user'
                                        active={state.activeItem === 'user'}
                                        onClick={handleItemClick}
                                        path="update_user">
                                        Update User
                                    </Menu.Item>
                                </>
                                : <></>}
                            <Menu.Item
                                name='all'
                                active={state.activeItem === 'all'}
                                onClick={handleItemClick}
                                path="all_project"
                            >
                                All Projects
                            </Menu.Item>
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
                    <br />
                    <div className="navigation">
                        <h1 className="heading menu" style={{ fontFamily: "'Pacifico', cursive" }}>My Trello</h1>
                        <Icon id="myIcon" name="align justify" size="big" onClick={displayMenuMobile} className="hamburgerIcon" />
                    </div>
                    <div className="hamburger">
                        <Menu vertical borderless className="navBar">
                            <Menu.Item
                                name='home'
                                active={state.activeItem === 'home'}
                                onClick={handleItemClick}
                                path="dashboard">
                                Dasboard
                            </Menu.Item>
                            {!props.project && !props.list && !props.card ?
                                <Menu.Item
                                    name='projects'
                                    active={state.activeItem === 'projects'}
                                    path='create_project'
                                    onClick={handleItemClick}
                                >
                                    Create Project
                                </Menu.Item>
                                : !props.list && !props.card ?
                                    <>
                                        <Menu.Item
                                            name='project'
                                            active={state.activeItem === 'project'}
                                            path='my_project'
                                            onClick={handleItemClick}
                                        >
                                            Project
                                        </Menu.Item>
                                        <Menu.Item
                                            name='update'
                                            active={state.activeItem === 'update'}
                                            path='update_project'
                                            onClick={handleItemClick}
                                        >
                                            Update Project
                                        </Menu.Item>
                                        <Menu.Item
                                            name='delete'
                                            active={state.activeItem === 'delete'}
                                            path='delete_project'
                                            onClick={handleItemClick}
                                        >
                                            Delete Project
                                        </Menu.Item>
                                        <Menu.Item
                                            name='list'
                                            active={state.activeItem === 'list'}
                                            path='create_list'
                                            onClick={handleItemClick}
                                        >
                                            Add List
                                        </Menu.Item>
                                    </> : !props.card ?
                                        <>
                                            <Menu.Item
                                                name='list'
                                                active={state.activeItem === 'list'}
                                                path='my_list'
                                                onClick={handleItemClick}
                                            >
                                                List
                                            </Menu.Item>
                                            <Menu.Item
                                                name='update'
                                                active={state.activeItem === 'update'}
                                                path='update_list'
                                                onClick={handleItemClick}
                                            >
                                                Update List
                                            </Menu.Item>
                                            <Menu.Item
                                                name='delete'
                                                active={state.activeItem === 'delete'}
                                                path='delete_list'
                                                onClick={handleItemClick}
                                            >
                                                Delete List
                                            </Menu.Item>
                                            <Menu.Item
                                                name='card'
                                                active={state.activeItem === 'card'}
                                                path='create_card'
                                                onClick={handleItemClick}
                                            >
                                                Add Card
                                            </Menu.Item>
                                        </> :
                                        <>
                                            <Menu.Item
                                                name='card'
                                                active={state.activeItem === 'card'}
                                                path='my_card'
                                                onClick={handleItemClick}
                                            >
                                                Card
                                            </Menu.Item>
                                            <Menu.Item
                                                name='update'
                                                active={state.activeItem === 'update'}
                                                path='update_card'
                                                onClick={handleItemClick}
                                            >
                                                Update Card
                                            </Menu.Item>
                                            <Menu.Item
                                                name='delete'
                                                active={state.activeItem === 'delete'}
                                                path='delete_card'
                                                onClick={handleItemClick}
                                            >
                                                Delete Card
                                            </Menu.Item>
                                        </>
                            }
                            {props.admin ?
                                <>
                                    <Menu.Item
                                        name='admin'
                                        active={state.activeItem === 'admin'}
                                        onClick={handleItemClick}
                                        path="admin">
                                        Admin Page
                                    </Menu.Item>
                                    <Menu.Item
                                        name='user'
                                        active={state.activeItem === 'user'}
                                        onClick={handleItemClick}
                                        path="update_user">
                                        Update User
                                    </Menu.Item>
                                </>
                                : <></>}
                            <Menu.Item
                                name='all'
                                active={state.activeItem === 'all'}
                                onClick={handleItemClick}
                                path="all_project"
                            >
                                All Projects
                            </Menu.Item>
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
                </>
                : <Redirect to="/login" />}
        </>
    )
}

MenuHeader.defaultProps = {
    'active': 'home',
    'disable': false,
    'login': false,
    'admin': false,
    'project': false,
    'list': false,
    'card': false,
}
MenuHeader.prototype = {
    'active': PropTypes.string,
    'disable': PropTypes.bool,
    'admin': PropTypes.bool,
    'project': PropTypes.bool,
    'list': PropTypes.bool,
}