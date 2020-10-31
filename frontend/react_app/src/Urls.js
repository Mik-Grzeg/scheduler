import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

import Login from "./components/Login";
import Schedule from "./components/Schedule";
import InstructorDashboard from './components/InstructorDashBoard';

function PrivateRoute({ isAuthenticated, children, ...rest}) {
    return (
        <Route
        {...rest}
        render={({location }) => 
        isAuthenticated? (
            children
        ) : (
            <Redirect
                to={{ 
                    pathname:"/login/",
                    state: { from: location }
                }}
                />
            )}
        />
    );
}

function Urls(props) {

    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/login/"> <Login {...props} /></Route>
                    <PrivateRoute exact path="/" isAuthenticated={props.isAuthenticated}> <Schedule {...props}/></PrivateRoute>
                    <PrivateRoute exact path="/instructor" isAuthenticated={props.isAuthenticated}> <InstructorDashboard {...props}/></PrivateRoute>

                </Switch>
            </BrowserRouter>
        </div>
    )
};

export default Urls;