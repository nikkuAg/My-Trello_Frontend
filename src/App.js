import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// Components
import { Login } from './components/Login';
import { Token } from './components/Token';
import { Header } from './components/Header';
import { Test } from './components/test';


export const App = () => {
  let tokenSave = String(sessionStorage.getItem("token"))
  const [token, settoken] = useState(tokenSave === "null" ? "" : tokenSave)
  const [logIn, setlogIn] = useState(token === "" ? false : true)
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={() => (<Login login={logIn} />)} />
        <Route path="/header" component={() => (<Header navBar={true} login={logIn} />)} />
        <Route path="/test" component={() => (<Test />)} />
        <Route path="/token" component={() => (<Token settoken={settoken} setlogin={setlogIn} />)} />
        <Redirect to={logIn ? "/header" : "/login"} />
      </Switch>
    </BrowserRouter>
  );

}