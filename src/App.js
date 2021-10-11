import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';

// Components
import { Login } from './components/Login';
import { Token } from './components/Token';
import { Logout } from './components/Logout';
import { Dashboard } from './components/Dashboard';
import { CreateProject } from './components/CreateProject';
import { Project } from './components/Project';
import { UpdateProject } from './components/UpdateProject';
import { DeleteProject } from './components/DeleteProject';
import { CreateList } from './components/CreateList';
import { List } from './components/List';
import { UpdateList } from './components/UpdateList';
import { DeleteList } from './components/DeleteList';
import { CreateCard } from './components/CreateCard';
import { Card } from './components/Card';
import { UpdateCard } from './components/UpdateCard';
import { DeleteCard } from './components/DeleteCard';
import { Admin } from './components/Admin';
import { UpdateUser } from './components/UpdateUser';
import { AllProjects } from './components/AllProjects';




export const App = () => {
  let tokenSave = String(localStorage.getItem("token"));
  let adminSave = String(localStorage.getItem("admin"));
  let disableSave = String(localStorage.getItem("disable"));
  let idSave = String(localStorage.getItem("id"));
  const [error, seterror] = useState("");
  const [token, settoken] = useState(tokenSave === "null" ? "" : tokenSave);
  const [logIn, setlogIn] = useState(token === "" ? false : true);
  const [admin, setadmin] = useState(adminSave === "true" ? true : false);
  const [disable, setdisable] = useState(disableSave === "true" ? true : false);
  const [user, setuser] = useState(idSave === "null" ? 0 : idSave);
  const [userList, setuserList] = useState([]);
  const apiUrl = 'http://127.0.0.1:8000/trello/users/'
  useEffect(() => {
    if (logIn) {
      axios.get(apiUrl, {
        headers: {
          'Authorization': token,
        }
      })
        .then(res => {
          setuserList(res.data)
        })
    }

  }, [])
  return (

    <BrowserRouter>
      <Switch>
        <Route path="/login" component={() => (<Login login={logIn} disable={disable} message={error} />)} />
        <Route path="/token" component={() => (<Token settoken={settoken} setuser={setuser} setlogin={setlogIn} setdisable={setdisable} setadmin={setadmin} />)} />
        <Route path="/logout" component={() => (<Logout login={logIn} setlogin={setlogIn} error={seterror} />)} />
        <Route path="/dasboard" component={() => (<Dashboard navBar={true} login={logIn} disable={disable} admin={admin} id={user} token={token} users={userList} />)} />
        <Route path="/admin" component={() => (<Admin navBar={true} login={logIn} disable={disable} admin={admin} id={user} token={token} users={userList} />)} />
        <Route path="/all_project" component={() => (<AllProjects navBar={true} login={logIn} disable={disable} admin={admin} id={user} token={token} users={userList} />)} />
        <Route path="/update_user" component={() => (<UpdateUser navBar={true} login={logIn} disable={disable} admin={admin} id={user} token={token} users={userList} />)} />
        <Route path="/my_project/:id" component={() => (<Project login={logIn} disable={disable} admin={admin} id={user} token={token} users={userList} />)} />
        <Route path="/my_list/:id" component={() => (<List login={logIn} disable={disable} admin={admin} id={user} token={token} users={userList} />)} />
        <Route path="/my_card/:id" component={() => (<Card login={logIn} disable={disable} admin={admin} id={user} token={token} users={userList} />)} />
        <Route path="/update_project/:id" component={() => (<UpdateProject login={logIn} disable={disable} admin={admin} id={user} token={token} users={userList} />)} />
        <Route path="/update_list/:id" component={() => (<UpdateList login={logIn} disable={disable} admin={admin} id={user} token={token} users={userList} />)} />
        <Route path="/update_card/:id" component={() => (<UpdateCard login={logIn} disable={disable} admin={admin} id={user} token={token} users={userList} />)} />
        <Route path="/delete_project/:id" component={() => (<DeleteProject login={logIn} disable={disable} admin={admin} id={user} token={token} />)} />
        <Route path="/delete_list/:id" component={() => (<DeleteList login={logIn} disable={disable} admin={admin} id={user} token={token} />)} />
        <Route path="/delete_card/:id" component={() => (<DeleteCard login={logIn} disable={disable} admin={admin} id={user} token={token} />)} />
        <Route path="/create_list/:id" component={() => (<CreateList login={logIn} disable={disable} admin={admin} id={user} token={token} />)} />
        <Route path="/create_card/:id" component={() => (<CreateCard login={logIn} disable={disable} admin={admin} id={user} token={token} users={userList} />)} />
        <Route path="/create_project" component={() => (<CreateProject login={logIn} disable={disable} admin={admin} id={user} token={token} users={userList} />)} />
        <Redirect to={logIn ? "/dasboard" : "/login"} />
      </Switch>
    </BrowserRouter>
  );
}