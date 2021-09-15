import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Login } from './Login';

export const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={Login} />
            </Switch>
        </BrowserRouter>
    )
}
