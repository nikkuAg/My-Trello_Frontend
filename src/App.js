import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// Components
import { Login } from './components/Login';
import { Token } from './components/Token';
import { Header } from './components/Header';
import MyComponent from './components/test';
import { Logout } from './components/Logout';
import { Dashboard } from './components/Dashboard';


export const App = () => {
  let tokenSave = String(sessionStorage.getItem("token"))
  let adminSave = String(sessionStorage.getItem("admin"))
  let disableSave = String(sessionStorage.getItem("disable"))
  let idSave = String(sessionStorage.getItem("id"))
  const [error, seterror] = useState("")
  const [token, settoken] = useState(tokenSave === "null" ? "" : tokenSave)
  const [logIn, setlogIn] = useState(token === "" ? false : true)
  const [admin, setadmin] = useState(adminSave === "true" ? true : false)
  const [disable, setdisable] = useState(disableSave === "true" ? true : false)
  const [user, setuser] = useState(idSave === "null" ? 0 : idSave)
  console.log(admin, disable, logIn, user, disableSave)
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={() => (<Login login={logIn} disable={disable} message={error} />)} />
        <Route path="/header" component={() => (<Header navBar={true} login={logIn} disable={disable} admin={admin} />)} />
        <Route path="/test" component={() => (<MyComponent />)} />
        <Route path="/token" component={() => (<Token settoken={settoken} setuser={setuser} setlogin={setlogIn} setdisable={setdisable} setadmin={setadmin} />)} />
        <Route path="/logout" component={() => (<Logout login={logIn} setlogin={setlogIn} error={seterror} />)} />
        <Route path="/dasboard" component={() => (<Dashboard navBar={true} login={logIn} disable={disable} admin={admin} id={user} token={token} />)} />
        <Redirect to={logIn ? "/dasboard" : "/login"} />
      </Switch>
    </BrowserRouter>
  );
}