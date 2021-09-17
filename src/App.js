import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// Components
import { Login } from './components/Login';
import { Token } from './components/Token';
import { Header } from './components/Header';


export const App = () => {
  let tokenSave = String(sessionStorage.getItem("token"))
  const [token, settoken] = useState(tokenSave === "null" ? "" : tokenSave)
  console.log(token)
  // if (token === "") {
  //   return (
  //     <>
  //       <BrowserRouter>
  //         <Route path="/login" component={Login} />
  //         <Redirect to="/login" />
  //       </BrowserRouter>
  //     </>
  //   )
  // }
  // else {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={() => (<Login login={token === "" ? false : true} />)} />
        <Route path="/header" component={() => (<Header navBar={true} token={token} />)} />
        <Route path="/token" component={() => (<Token settoken={settoken} token={token} />)} />
        <Redirect to={token === "/header" ? "/login" : ""} />
      </Switch>
    </BrowserRouter>
  );
  // }

}